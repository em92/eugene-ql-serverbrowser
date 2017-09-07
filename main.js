#!/usr/bin/env node
var express = require('express');
var ssw = require("./server-state-wrapper.js");
var dns = require("./dns.js");
var auth = require("./auth.js");

var serverInfo = ssw.serverInfo;
var checkServerUsingFilterData = ssw.checkServerUsingFilterData;
var app = express();

var HTTP_PORT = parseInt(process.env.PORT);
if (HTTP_PORT != HTTP_PORT || HTTP_PORT.toString() != process.env.PORT) {
  HTTP_PORT = 3000;
}
var MAX_SERVER_OUTPUT_COUNT = 100;

var serverList = function(filter_data) {

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

  var sort_priority = {"EU": 6, "NA": 5, "SA": 4, "OC": 3, "AS": 2, "AF": 1};
  result.sort(function(server1, server2) {
    if ( (server1.gameinfo.players.length > 0) && (server2.gameinfo.players.length == 0) )
      return -1;
    else if ( (server2.gameinfo.players.length > 0) && (server1.gameinfo.players.length == 0) )
      return 1;
    else if ( server1.gameinfo.players.length == server2.gameinfo.players.length ) // equal 0
      return 0;
    else if ( sort_priority[server2.location.region] > sort_priority[server1.location.region] )
      return 1;
    else if ( sort_priority[server1.location.region] > sort_priority[server2.location.region] )
      return -1;
    return 0;
  });

  result = result.filter(function(server, i) {
    return i < MAX_SERVER_OUTPUT_COUNT;
  });
  return {servers: result};
};

app.use(require('body-parser').json());

app.get('/serverlist/:filter_data', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(serverList(req.params.filter_data));
});

app.get('/serverlist', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(serverList());
});

app.get('/rawserverlist', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(serverInfo);
});

app.get('/serverinfo/:endpoint', function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(serverInfo[req.params.endpoint]);
});

app.get('/qlstats/:endpoint', function (req, res) {
  ssw.queryQLStatsServerInfo( req.params.endpoint, function( data ) {
    res.setHeader("Content-Type", "application/json");
    res.send( data );
  });
});

app.get('/serverinfo2/:endpoints', function (req, res) {
  res.setHeader("Content-Type", "application/json");
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
    res.send({result: result, failed: failed});
  });
});

if (process.env.npm_lifecycle_event == "start-dev") {
  var fs = require("fs");
  var index_file_data = fs.readFileSync(__dirname + '/public/index.html', {encoding: 'utf8'}).replace(
    '<script type="text/javascript" src="/js/serverbrowser.js"></script>',
    '<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script><script type="text/babel" src="/js/serverbrowser.babel.js"></script>'
  ).replace('.min.js', '.js');
  app.get('/', function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.send(index_file_data);
  });
}

app.use(express.static('public'));

auth.bind_methods(app);

app.listen(HTTP_PORT, function () {
  console.log("Eugene's Quake Live Server Browser started on port " + HTTP_PORT);
});
