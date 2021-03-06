#!/usr/bin/env node
require('dotenv').config();
var express = require('express');
var ssw = require("./server-state-wrapper.js");
var dns = require("./dns.js");
var auth = require("./auth.js");
var sp = require("./server-promotion.js");

var serverInfo = ssw.serverInfo;
var checkServerUsingFilterData = ssw.checkServerUsingFilterData;
var app = express();

var HTTP_PORT = parseInt(process.env.PORT);
if (HTTP_PORT != HTTP_PORT || HTTP_PORT.toString() != process.env.PORT) {
  HTTP_PORT = 3000;
}
var MAX_SERVER_OUTPUT_COUNT = 100;

var serverList = function(filter_data, ratings) {

  var gametype_weight = function(g_gametype) {
    switch(g_gametype) {
      case 1: // Duel
        return 101;

      case 2: // Race
        return 100;

      default:
        return g_gametype;
    }
    return
  }

  if (typeof filter_data != 'undefined') {
    try {
      filter_data = (new Buffer(filter_data, 'base64')).toString();
      filter_data = JSON.parse(filter_data);
    } catch(e) {
      return {error: 'invalid filter data'};
    }
  }

  var result = [];
  for (address in serverInfo) {
    if (checkServerUsingFilterData(serverInfo[address], filter_data) == 1) {
      result.push(serverInfo[address]);
    }
  };

  result.sort(function(server1, server2) {
    if ( (server1.is_promoted > 0) && (server2.is_promoted == 0) )
      return -1;
    else if ( (server2.is_promoted > 0) && (server1.is_promoted == 0) )
      return 1;
    else if ( (server1.is_promoted > 0) && (server2.is_promoted > 0) )
      return server2.is_promoted - server1.is_promoted;

    if ( (server1.gameinfo.players.length > 0) && (server2.gameinfo.players.length == 0) )
      return -1;
    else if ( (server2.gameinfo.players.length > 0) && (server1.gameinfo.players.length == 0) )
      return 1;
    else if ( (server1.gameinfo.players.length == 0) && (server2.gameinfo.players.length == 0) )
      return 0;

    if (server1.gameinfo.g_gametype != server2.gameinfo.g_gametype)
      return gametype_weight( server1.gameinfo.g_gametype ) - gametype_weight( server2.gameinfo.g_gametype );
    else
      return server2.gameinfo.g_levelstarttime - server1.gameinfo.g_levelstarttime;
  });

  result = result.filter(function(server, i) {
    return i < MAX_SERVER_OUTPUT_COUNT;
  });

  if (ratings) {
    result = result.map( server => {
      if (
        server.gameinfo.rating_type &&
        ratings[ server.gameinfo.gt_short ] &&
        ratings[ server.gameinfo.gt_short ][ server.gameinfo.rating_type + "_games" ] > 0
      ) {

        var server_rating = server.gameinfo.rating_avg;
        var player_rating = ratings[ server.gameinfo.gt_short ][ server.gameinfo.rating_type + "_rating" ];
        var diff = player_rating - server_rating;
        if (diff < -300) {
          server.rank = 3;
        } else if ( diff < -100 ) {
          server.rank = 2;
        } else if ( diff < 100 ) {
          server.rank = 1;
        } else {
          server.rank = 0;
        }
      } else {
        server.rank = -1;
      }

      return server;
    });
  }
  return {servers: result};
};

app.use(require('body-parser').json());

app.get('/rawserverlist', function (req, res) {
  res.json(serverInfo);
});

app.get('/serverinfo/:endpoint', function (req, res) {
  if (!serverInfo[req.params.endpoint]) {
    res.status(404).json({error: "server not found"});
  } else {
    res.json(serverInfo[req.params.endpoint]);
  }
});

app.get('/qlstats/:endpoint', function (req, res) {
  ssw.queryQLStatsServerInfo( req.params.endpoint, function( data ) {
    res.json( data );
  });
});

app.get('/serverinfo2/:endpoints', function (req, res) {
  var failed = [];
  var result = [];
  var input_endpoints = req.params.endpoints.split(",");
  dns.lookup( input_endpoints )
  .then( endpoints => {
    endpoints.forEach( function(endpoint, i) {
      endpoint = endpoint.trim();
      if ( serverInfo[ endpoint ] ) {
        var server = Object.assign({}, serverInfo[ endpoint ]);
        server.host_address = input_endpoints[i];
        result.push( server );
      } else {
        failed.push( input_endpoints[i] );
      }
    });
    res.json({result: result, failed: failed});
  });
});

app.use(express.static('public'));

auth.bind_methods(app);

app.get('/serverlist/:filter_data', function (req, res) {
  res.json(serverList( req.params.filter_data, req.user ? req.user.ratings : undefined ));
});

app.get('/serverlist', function (req, res) {
  res.json(serverList( undefined, req.user ? req.user.ratings : undefined ));
});

app.post("/promote", auth.ensure_logged_in, function(req, res) {
  sp.locate_player(req.user.steamid, ssw.serverInfo, (result) => {
    if (result.ok == false) {
      res.json(result);
      return;
    }

    if (!ssw.serverInfo[result.endpoint]) {
      res.json({
        message: "Your server cannot be found in server list",
        ok: false
      });
      return;
    }

    ssw.serverInfo[result.endpoint].is_promoted = sp.promote( result.endpoint );
    res.json({
      message: "Your server has been promoted",
      ok: false
    });
  });
});

app.listen(HTTP_PORT, function () {
  console.log("Eugene's Quake Live Server Browser started on port " + HTTP_PORT);
});
