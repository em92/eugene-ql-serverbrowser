#!/usr/bin/env node
var express = require('express');
var ssw = require("./server-state-wrapper.js");

var serverInfo = ssw.serverInfo;
var checkServerUsingFilterData = ssw.checkServerUsingFilterData;
var app = express();

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

if (process.env.npm_lifecycle_event == "start-dev") {
  var fs = require("fs");
  var index_file_data = fs.readFileSync(__dirname + '/public/index.html', {encoding: 'utf8'}).replace("<!-- dev", "");
  app.get('/', function (req, res) {
    res.setHeader("Content-Type", "text/html");
    res.send(index_file_data);
  });
  app.get('/js/serverbrowser.js', function(req, res) {
    res.sendStatus(403);
  });
}

app.use(express.static('public'));

app.listen(3000, function () {
  console.log("Eugene's Quake Live Server Browser started on port 3000");
});
