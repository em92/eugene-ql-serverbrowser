var geoip = require('./geoip.js');
var gsqw = require("./game-server-query-wrapper.js");
var master = require('./master.js');
var Q = require('q');
var skillrating = require('./skillrating.js');
var sp = require('./server-promotion.js');

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
    if ( state.raw.gameid != "282440" )
      throw new Error("invalid gameid: " + state.raw.gameid);

    var item = {
      host_address: address,
      host_name: state.name,
      location: state.geo,
      password: state.password,
      tags: state.raw.tags.split(",").map( tag => tag.trim().toLowerCase() ),
      dedicated: state.raw.listentype == "d",
      vac: state.raw.secure ? true : false,
      is_promoted: sp.is_promoted(address),
      is_rated: skillrating.skill_rating[ address ] ? true : false,
      gameinfo: {
        gt_short: getFactoryByTags(state.raw.tags),

        bots: state.bots,
        g_gamestate: state.raw.rules ? state.raw.rules.g_gamestate : "n/a",
        g_gametype: state.raw.rules ? parseInt(state.raw.rules.g_gametype) : getGametypeByTags(state.raw.tags),
        g_factory: state.raw.rules ? state.raw.rules.g_factory : getFactoryByTags(state.raw.tags),
        g_factorytitle: state.raw.rules ? state.raw.rules.g_factorytitle : "n/a",
        g_instagib: state.raw.rules ? parseInt(state.raw.rules.g_instagib) : isInstagibByTags(state.raw.tags),
        g_levelstarttime: state.raw.rules ? parseInt(state.raw.rules.g_levelstarttime) : 0,

        g_bluescore: state.raw.rules && state.raw.rules.g_bluescore ? parseInt(state.raw.rules.g_bluescore) : 0,
        g_redscore:  state.raw.rules && state.raw.rules.g_bluescore ? parseInt(state.raw.rules.g_redscore)  : 0,

        mapname: state.map.toLowerCase(),
        rating_min: skillrating.skill_rating[ address ] ? skillrating.skill_rating[ address ].min : 0,
        rating_max: skillrating.skill_rating[ address ] ? skillrating.skill_rating[ address ].max : 9999,
        rating_avg: skillrating.skill_rating[ address ] ? skillrating.skill_rating[ address ].avg : null,
        rating_type: skillrating.skill_rating[ address ] ? skillrating.skill_rating[ address ].rating.toLowerCase() : null,
        players: state.players,
        sv_maxclients: state.raw.rules ? parseInt(state.raw.rules.sv_maxclients): state.maxplayers,
        timelimit: state.raw.rules ? parseInt(state.raw.rules.timelimit) : 0,
        teamsize: state.raw.rules ? parseInt(state.raw.rules.teamsize) : 0
      }
    };

    item.gameinfo.is_team_game = (item.gameinfo.g_gametype >= 3 && item.gameinfo.g_gametype <= 11);

    if (item.is_rated && skillrating.skill_rating[ address ].pc == 0) {
      // if QLStats thinks that non-ghosts players count is 0
      item.gameinfo.players = [];
    }

    if (item.gameinfo.g_gametype == 2) { // Race
      item.gameinfo.g_instagib = 0;
      item.is_rated = true;
    } else if (item.gameinfo.g_gametype == 7) { // 7 - not valid gametype
      throw new Error("invalid gametype: 7");
    } else if (item.gameinfo.g_gametype == null) { // can be returned, if server is not ql
      throw new Error("invalid gametype: null");
    }

    if (item.gameinfo.g_gamestate == "COUNT_DOWN") {
      item.gameinfo.g_gamestate = "IN_PROGRESS";
    }

    item.gameinfo.players.sort( (p1, p2) => {
      return p2.score - p1.score;
    });

    if (
      item.dedicated == false ||
      typeof(skillrating.skill_rating[ address ]) == "undefined"
    ) {
      item.qlstats = {
        msg: "Server is not being tracked (cached)",
        ok: false
      };
    }

    if (item.gameinfo.players.length == 0) {
      sp.demote( address );
    }

    if (process.env.npm_lifecycle_event == "start-dev") {
      item.raw = state;
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
      case 'gametype':
        return +(server.gameinfo['g_gametype'] + 100*server.gameinfo['g_instagib'] == value);

      case 'g_gametype':
      case 'g_instagib':
        return +(server.gameinfo[key] == value);

      case 'g_gamestate':
      case 'g_factory':
      case 'mapname':
        return +(server.gameinfo[key].toUpperCase() == value);

      case 'min_players':
        if (server.is_promoted) return 1;
        return +(server.gameinfo.players.length >= value);

      case 'region':
        if (value == "EUX") return +( server.location.region == "EU" || server.location.region == "EA" );
        if (value == "ASX") return +( server.location.region == "AS" )
        if (value == "AS")  return +( server.location.region == "AS" || server.location.region == "EA" );
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
            if (server_tag == tag) return false;
            return true;
          });

          var bad_tags = sum.filter(function( tag ) {
            if (tag == "") return false;
            if (tag[0] == "!") return true;
            return false;
          });

          if (good_tags.length == 0 && bad_tags.length == 0) return true;

          var is_bad_server = bad_tags.some(function( bad_tag ) {
            return ("!" + server_tag ) == bad_tag;
          });

          if (is_bad_server) return false;

          if (server_tag_index == server.tags.length - 1) return good_tags.length == 0;

          return [].concat(good_tags, bad_tags);
        }, value.split(',').map( tag => tag.trim().toLowerCase() ) ) );

      case 'vampiric':
        return +(server.tags.some( tag => tag == 'vampiric' ) == value);

      case 'turbo':
        return +(server.tags.some( tag => tag == 'pql' ) == value);

      case 'rating_min':
        return +(server.gameinfo.rating_avg != null ? value < server.gameinfo.rating_avg : 0);

      case 'rating_max':
        return +(server.gameinfo.rating_avg != null ? value > server.gameinfo.rating_avg : 0);

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

var queryQLStatsServerInfo = function( endpoint, callback ) {

  if (typeof(serverInfo[endpoint]) == "undefined") {
    return callback({ok: false, msg: "no such endpoint"});
  }

  if (typeof(serverInfo[endpoint].qlstats) != "undefined") {
    return callback(serverInfo[endpoint].qlstats);
  }

  var getScoreByPlayerName = function( name ) {
    return serverInfo[endpoint].gameinfo.players.reduce( function(score, player) {
      if (score != null) return score;
      else if (player.name == name || player.name + "^7" == name) return player.score;
      return null;
    }, null);
  };

  Q(skillrating.query_server_players( endpoint ))
  .then( data => {
    if ( typeof(data) == 'undefined' ) {
      callback({ok: false, msg: "not available. try later"});
      return;
    }

    if (data.ok == false) {
      callback(data);
      return;
    }

    data.players = data.players.map( player => {
      player.score = getScoreByPlayerName( player.name );
      return player;
    });
    serverInfo[endpoint].qlstats = data;
    callback(data);
  })
  .catch( error => {
    console.trace(error);
    callback({ok: false, msg: error.message });
  });
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
      console.error(error);
      setTimeout(updateServerInfo, 5000);
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
        state['geo'] = geoip.lookup(state.query.host, state.raw.listentype == "d");

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
          if ( state == null ) {
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
module.exports.queryQLStatsServerInfo = queryQLStatsServerInfo;
