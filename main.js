var express = require('express');
var Q = require("q");

var gsqw = require("./game-server-query-wrapper.js");
var geoip = require('./geoip.js');
var master = require('./master.js');

var app = express();
var servers = [];
var serverInfo = {};
var time_to_update_server_list = true;

var UPDATE_SERVER_INFO_PERIOD = 10;
var UPDATE_SERVER_LIST_INTERVAL_SECONDS = 60*60;
var MAX_SERVER_OUTPUT_COUNT = 100;

setInterval(function() {
  time_to_update_server_list = true;
}, UPDATE_SERVER_LIST_INTERVAL_SECONDS*1000);

var updateServerInfo = function() {

  if (time_to_update_server_list == true) {
    Q(master.query())
    .then( result => {
      time_to_update_server_list = false;
      servers = result;
      Object.keys(serverInfo).forEach( server => {
        if ( servers.indexOf( server ) == -1 ) {
          delete serverInfo[server];
        }
      });
    })
    .catch( error => {
      console.error("master.query error");
      console.error(error);
    })
    .finally( () => {
      updateServerInfo();
    });
    return;
  }

  var gsqw_callback = function( server, state ) {
    if (state.error) {
      if (typeof(serverInfo[server]) != "undefined") {
        if (typeof(serverInfo[server].error_cnt) == "undefined") {
          serverInfo[server].error_cnt = 1;
        } else if (serverInfo[server].error_cnt == 5) {
          delete serverInfo[server];
        } else {
          serverInfo[server].error_cnt += 1;
        }
      }
    } else {
      state.players = state.players.filter(function(player) {
        return (player.time < 43200);
      });

      try {
        state['geo'] = geoip.lookup(state.query.host);

        // some servers return g_gametype
        // some servers return g_gameType
        // lowercasing value names in state.raw.rules
        // not to have undefined errors
        try {
          for(key in state.raw.rules) {
            if (key != key.toLowerCase()) {
              state.raw.rules[key.toLowerCase()] = state.raw.rules[key];
              delete state.raw.rules[key];
            }
          }
          serverInfo[server] = state;
        } catch (e) {
          console.error(server + " - error: " + e.message);
        }
      } catch (e) {
        console.error(server + " - geoip error: " + e.message);
      };
    }
  };

  var execution_time;
  Q( geoip.ready() )
  .then( () => {
    execution_time = new Date();
    return gsqw(servers, gsqw_callback);
  })
  .then( () => {
    var now = new Date();
    execution_time = now - execution_time;
    console.log("[" +  now.toLocaleDateString() + " " + now.toLocaleTimeString() + "]: " + servers.length + " servers scanned in " + ( execution_time / 1000 ) + " s.");
    setTimeout(updateServerInfo, 10000);
  });
};

var checkServerUsingFilterData = function(server, filter_data, checking_key) {
  // return values:
  // 1 - true
  // 0 - false
  // -1 - ignore
  var check_key_value = function(key, value) {
    if (typeof(value) == "string") {
      value = value.toUpperCase();
      if (value == "ANY")
        return 1;
    }

    switch(key) {
      case 'g_gametype':
      case 'g_instagib':
        return +(server.gameinfo[key] == value);

      case 'g_gamestate':
      case 'g_factory':
      case 'mapname':
        return +(server.gameinfo[key].toUpperCase() == value);

      case 'min_players':
        return +(server.gameinfo.players.length >= value);

      case 'region':
        return +(server.location.region == value);

      case 'country':
        return +(server.location.country == value);

      case 'private':
        return +(server.password == value);

      case 'ip':
        return +(server.host_address.split(':')[0] == value);

      case 'tags':
        return +(server.tags.reduce(function(sum, server_tag, server_tag_index) {
          if (sum === true) return true;
          if (sum === false) return false;

          var good_tags = sum.filter(function( tag ) {
            if (tag == "") return false;
            if (tag[0] == "!") return false;
            if (server_tag.trim().toLowerCase() == tag.trim().toLowerCase()) return false;
            return true;
          });

          var bad_tags = sum.filter(function( tag ) {
            if (tag == "") return false;
            if (tag[0] == "!") return true;
            return false;
          });

          if (good_tags.length == 0 && bad_tags.length == 0) return true;

          var is_bad_server = bad_tags.some(function( bad_tag ) {
            return ("!" + server_tag.trim().toLowerCase() ) == bad_tag.trim().toLowerCase();
          });

          if (is_bad_server) return false;

          if (server_tag_index == server.tags.length - 1) return good_tags.length == 0;

          return [].concat(good_tags, bad_tags);
        }, value.split(',')));

      // +(bool) -> int
      default:
        return -1;
    }
  };

  if (typeof checking_key == 'undefined') {
    checking_key = "_";
  }

  if (checking_key[0] == "!") {
    var r = checkServerUsingFilterData(server, filter_data, checking_key.substring(1));
    switch(r) {
      case 1:
        return 0;

      case 0:
        return 1;

      default:
        return -1;
    }
  }

  if (checking_key[0] == "_") {
    if (Array.isArray(filter_data)) {
      for(var i in filter_data) {
        if (checkServerUsingFilterData(server, filter_data[i]) == 1) {
          return 1;
        }
      }
      return 0;
    } else if (typeof filter_data == 'object') {
      for(var i in filter_data) {
        var result = -1;
        if (checkServerUsingFilterData(server, filter_data[i], i) == 0) {
          return 0;
        } else {
          result = 1;
        }
      }
      return result;
    } else {
      return -1;
    }
  } else {
    if (Array.isArray(filter_data)) {
      for(var i in filter_data) {
        if (check_key_value(checking_key, filter_data[i]) == 1) {
          return 1;
        }
      }
      return 0;
    } else if (typeof filter_data == 'object') {
      for(var i in filter_data) {
        if (check_key_value(checking_key, filter_data[i]) == 0) {
          return 0;
        }
      }
      return 1;
    } else {
      return check_key_value(checking_key, filter_data);
    }
  }
};

var serverList = function(filter_data) {
  var getGametypeByTags = function(tags) {
    var gametypeString = tags.split(",")[0];
    switch(gametypeString) {
      case 'ffa':
        return 0;

      case 'duel':
        return 1;

      case 'race':
        return 2;

      case 'tdm':
        return 3;

      case 'clanarena':
        return 4;

      case 'ctf':
        return 5;

      case 'oneflag':
        return 6;

      case 'harvester':
        return 8;

      case 'freezetag':
        return 9;

      case 'domination':
        return 10;

      case 'a&d':
        return 11;

      case 'redrover':
        return 12;

      default:
        return 7;
    };
  };
  var isInstagibByTags = function(tags) {
    return tags.split(",").indexOf("instagib") == -1 ? 0 : 1;
  };
  var result = [];
  for (server in serverInfo) {
    try {
    result.push({
        host_address: server,
        host_name: serverInfo[server].name,
        location: serverInfo[server].geo,
        password: serverInfo[server].password,
        tags: serverInfo[server].raw.tags.split(","),
        gameinfo: {
          bots: serverInfo[server].bots,
          g_gamestate: serverInfo[server].raw.rules ? serverInfo[server].raw.rules.g_gamestate : "n/a",
          g_gametype: serverInfo[server].raw.rules ? parseInt(serverInfo[server].raw.rules.g_gametype) : getGametypeByTags(serverInfo[server].raw.tags),
          g_factory: serverInfo[server].raw.rules ? serverInfo[server].raw.rules.g_factory : getGametypeByTags(serverInfo[server].raw.tags),
          g_instagib: serverInfo[server].raw.rules ? parseInt(serverInfo[server].raw.rules.g_instagib) : isInstagibByTags(serverInfo[server].raw.tags),
          mapname: serverInfo[server].map.toLowerCase(),
          players: serverInfo[server].players,
          sv_maxclients: serverInfo[server].raw.rules ? parseInt(serverInfo[server].raw.rules.sv_maxclients): serverInfo[server].maxplayers,
          teamsize: serverInfo[server].raw.rules ? parseInt(serverInfo[server].raw.rules.teamsize) : 0
        }
      });
    } catch(e) {
      console.error("serverList  : " + server + " - error: " + e.message);
    }
  };
  if (typeof filter_data != 'undefined') {
    try {
      filter_data = (new Buffer(filter_data, 'base64')).toString();
      filter_data = JSON.parse(filter_data);
    } catch(e) {
      return {error: 'invalid filter data'};
    }
    result = result.filter(function(server) {
      return (checkServerUsingFilterData(server, filter_data) == 1);
    });
  }

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

app.use(express.static('public'));

app.listen(3000, function () {
  console.log("Eugene's Quake Live Server Browser started on port 3000");
  updateServerInfo();
});
