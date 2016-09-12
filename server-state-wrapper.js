var geoip = require('./geoip.js');
var gsqw = require("./game-server-query-wrapper.js");
var master = require('./master.js');
var Q = require('q');
var skillrating = require('./skillrating.js');

var serverInfo = {};

var UPDATE_SERVER_INFO_PERIOD = 10;
var UPDATE_SERVER_LIST_INTERVAL_SECONDS = 60*60;

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

var getFactoryByTags = function(tags) {
  var gametypeString = tags.split(",")[0];
  switch(gametypeString) {
    case 'ffa':
    case 'duel':
    case 'race':
    case 'tdm':
    case 'ctf':
      return gametypeString;

    case 'clanarena':
      return 'ca';

    case 'a&d':
      return 'ad';

    case 'harvester':
      return 'har';

    case 'oneflag':
      return '1fctf';

    case 'freezetag':
      return 'ft';

    case 'domination':
      return 'dom';

    case 'redrover':
      return 'rr';

    default:
      return gametypeString;
  };
};

var isInstagibByTags = function(tags) {
  return tags.split(",").indexOf("instagib") == -1 ? 0 : 1;
};

var format = function(address, state) {
  try {
    var item = {
      host_address: address,
      host_name: state.name,
      location: state.geo,
      password: state.password,
      tags: state.raw.tags.split(","),
      gameinfo: {
        bots: state.bots,
        g_gamestate: state.raw.rules ? state.raw.rules.g_gamestate : "n/a",
        g_gametype: state.raw.rules ? parseInt(state.raw.rules.g_gametype) : getGametypeByTags(state.raw.tags),
        g_factory: state.raw.rules ? state.raw.rules.g_factory : getFactoryByTags(state.raw.tags),
        g_instagib: state.raw.rules ? parseInt(state.raw.rules.g_instagib) : isInstagibByTags(state.raw.tags),
        mapname: state.map.toLowerCase(),
        players: state.players,
        sv_maxclients: state.raw.rules ? parseInt(state.raw.rules.sv_maxclients): state.maxplayers,
        teamsize: state.raw.rules ? parseInt(state.raw.rules.teamsize) : 0
      }
    };

    if (item.gameinfo.g_gametype == 2) { // Race
      item.gameinfo.g_instagib = 0;
    } else if (item.gameinfo.g_gametype == 7) { // 7 - not valid gametype
      throw new Error("invalid gametype: 7");
    }

    if (item.gameinfo.g_gamestate == "COUNT_DOWN") {
      item.gameinfo.g_gamestate = "IN_PROGRESS";
    }

    return item;

  } catch(e) {
    console.error("format : " + address + " - error: " + e.message);
    return null;
  }
}

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
      else if (value == "")
        return 0;
      else if (value[0] == "!" && key != "tags") {
        var r = check_key_value(key, value.substr(1));
        switch(r) {
          case 1:
            return 0;

          case 0:
            return 1;

          default:
            return -1;
        }
      }
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

  if (typeof filter_data == 'undefined') {
    return 1;
  }

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

var updateServerInfo = function( update_server_list ) {
  if (typeof(update_server_list) == "undefined") update_server_list = true;

  if (update_server_list == true) {
    Q.all( [ master.query(), skillrating.query() ] ).then( () => {
      Object.keys(serverInfo).forEach( server => {
        if ( master.servers.indexOf( server ) == -1 ) {
          delete serverInfo[server];
        }
      });
      updateServerInfo(false);
    })
    .catch( error => {
      console.error("updateServerInfo error");
      console.error(error);
      updateServerInfo(true);
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
        state['geo'] = geoip.lookup(state.query.host, skillrating.server_ips[ state.query.host ]);

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
          state = format(server, state);
          if ( state == null && typeof(serverInfo[server]) != "undefined" ) {
            delete serverInfo[server];
          } else {
            serverInfo[server] = state;
          }
        } catch (e) {
          console.error(server + " - error: " + e.message);
        }
      } catch (e) {
        console.error(server + " - geoip error: " + e.message);
      };
    }
  };

  var execution_time;
  geoip.ready().then( () => {
    execution_time = new Date();
    return gsqw(master.servers, gsqw_callback);
  })
  .then( () => {
    var now = new Date();
    execution_time = now - execution_time;
    console.log("[" +  now.toLocaleDateString() + " " + now.toLocaleTimeString() + "]: " + master.servers.length + " servers scanned in " + ( execution_time / 1000 ) + " s.");
    setTimeout(updateServerInfo, 10000);
  });
};

updateServerInfo();

module.exports.serverInfo = serverInfo;
module.exports.checkServerUsingFilterData = checkServerUsingFilterData;
