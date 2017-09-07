var rp = require("request-promise");

var servers = {};
var PLAYER_LOCATIONS_CACHE_TIMEOUT = 60;
var PROMOTION_TIMEOUT = 300;

var current_timestamp = function() {
  return Math.floor( Date.now() / 1000 );
}


var locate_player2 = function( steam_id, done, serverinfo, player_name ) {
  var BAD_RESULT = {
    message: "Could not detect on which server you are playing",
    ok: false
  };

  return rp({
    uri: 'https://api.qlstats.net/api/player/' + steam_id + '/locate',
    timeout: 2000,
    json: true
  })
  .then( data => {
    if (data.server) {
      result = {
        endpoint: data.server,
        ok: true
      };
    } else {
      result = {
        ok: false
      };
    }
    return result;
  })
  .catch( () => {
    return {ok: false};
  })
  .then( result => {
    if (result.ok) {
      done(result);
      return;
    }

    // try to locate player by name
    // not accurate, 'cos player can use fake names
    if (!player_name) {
      done(BAD_RESULT);
    }

    var approx_locations = Object.keys(serverinfo).filter( server => {
      var data = serverinfo[server];
      for(var i in data.gameinfo.players) {
        if (data.gameinfo.players[i].name == player_name) return true;
      }
      return false;
    });

    if (approx_locations.length == 1) {
      done({
        endpoint: approx_locations[0],
        ok: true
      });
    } else {
      done(BAD_RESULT);
    }
  });

}

var locate_player = function( steam_id, serverinfo, done ) {
  return rp({
    uri: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + process.env.STEAM_WEB_API_KEY + '&steamids=' + steam_id,
    timeout: 2000,
    json: true
  })
  .then( data => {

    var player_data = data.response && data.response.players && data.response.players[0] ? data.response.players[0] : {};

    if (
      player_data.gameid == "282440" &&
      player_data.gameserverip
    ) {
      done({
        endpoint: player_data.gameserverip,
        ok: true
      });
    } else {
      return locate_player2(steam_id, done, serverinfo, player_data.personaname);
    }
  })
  .catch( () => locate_player2(steam_id, done, serverinfo) );
}


var promote = function( endpoint ) {
  var ct = current_timestamp();
  if ( ( servers[endpoint] || 0 ) + PROMOTION_TIMEOUT < ct ) {
    servers[endpoint] = ct + PROMOTION_TIMEOUT;
    return true;
  }

  return false;
}


var demote = function( endpoints ) {
  if (typeof(endpoints) == "string") {
    endpoints = [endpoints];
  }

  endpoints.forEach( endpoint => {
    delete servers[endpoint];
  });
}


var is_promoted = function( endpoint ) {
  if (!servers[endpoint]) return 0;
  if (servers[endpoint] + PROMOTION_TIMEOUT < current_timestamp()) {
    demote(endpoint);
    return 0;
  }
  return servers[endpoint];
}


module.exports = {
  promote: promote,
  demote: demote,
  locate_player: locate_player,
  is_promoted: is_promoted
}
