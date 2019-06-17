var rp = require('request-promise');
var common = require('./common.js');

var redis = common.redis;
var error_handler = common.rp_error_handler;
var get_current_timestamp = common.get_current_timestamp;

const RATINGS_CACHE_RESET_TIME = 60*10;
const DEFAULT_RATING = 800;

var skill_rating = {};
var ZMQ_TO_GAME_ADDR_DATA = {
  '46.101.130.49': -1, // DOGs/
  '94.249.194.83': -1, // DOGs/
  '109.94.1.176': -1000, // 125FPS Podolsk/Moscow
  '120.76.221.244': -2000 // Moon (China)
};
var GAME_TO_ZMQ_ADDR_DICT = {};

var convert_zmq_to_game_addr = function( addr ) {
  try {
    var host = addr.split(":")[0];

    if ( ZMQ_TO_GAME_ADDR_DATA[ host ] ) {
      var port = parseInt(addr.split(":")[1]) + ZMQ_TO_GAME_ADDR_DATA[ host ];
      var game_addr = host + ":" + port.toString();
      GAME_TO_ZMQ_ADDR_DICT[ game_addr ] = addr;
      return game_addr;
    } else {
      return addr;
    }
  } catch(e) {
    return addr;
  }
};

var convert_game_to_zmq_addr = function( addr ) {
  return GAME_TO_ZMQ_ADDR_DICT[ addr ] ? GAME_TO_ZMQ_ADDR_DICT[ addr ] : addr;
};

var query = function() {
  var options = {
    uri: 'http://api.qlstats.net/api/server/skillrating',
    timeout: 5000,
    json: true
  };
  
  return rp(options)
  .then( data => {
    if ( Array.isArray(data) == false) {
      console.error("skillrating: data does not seem to be array");
      console.error(data);
      return;
    }
    server_ips = {};
    skill_rating = {}
    data.forEach(function(item) {
      var address = convert_zmq_to_game_addr( item.server );
      delete item.server;
      skill_rating[ address ] = item;
    });
  })
  .catch( error_handler );
};

var query_server_players = function( address ) {
  var options = {
    uri: 'http://api.qlstats.net/api/server/' + convert_game_to_zmq_addr( address ) + '/players',
    timeout: 5000,
    json: true
  };

  return rp(options).catch( error_handler );
};


var get_player_ratings = function( steam_id ) {

  return new Promise((resolve, reject) => {

    redis.get("qlsb:ratings:" + steam_id, function(err, reply) {
      var ratings = {};

      if (!err) {
        try {
          if (reply) {
            ratings = JSON.parse(reply);
          }
        } catch(e) {
          console.error("qlsb:ratings:" + steam_id + " not json object");
          console.error(reply);
        };
      } else {
        reject(err);
      }

      ratings['last_update'] = ratings['last_update'] || 0;
      if ( get_current_timestamp() - ratings['last_update'] < RATINGS_CACHE_RESET_TIME ) {
        resolve(ratings);
        return;
      }

      rp({
        uri: 'http://qlstats.net/player/' + steam_id + '.json',
        timeout: 2000,
        json: true
      })
      .then( data => {
        data = data[0]['elos'];
        delete data['overall'];
        Object.keys( data ).forEach( gametype => {
          var gametype_result = {};
          var summary = data[ gametype ];
          ratings[ gametype ] = {
            "a_rating": summary.g2_r ? summary.g2_r : DEFAULT_RATING,
            "b_rating": summary.b_r ? summary.b_r : DEFAULT_RATING,
            "a_games": summary.g2_games ? summary.g2_games : 0,
            "b_games": summary.b_games ? summary.b_games : 0
          };
        });

        ratings["last_update"] = get_current_timestamp();

        redis.set("qlsb:ratings:" + steam_id, JSON.stringify(ratings), function(err, reply) {
          if (err) {
            console.error("could not save ratings cache for player " + steam_id);
            console.error(err);
          }

          resolve(ratings);
        });

      })
      .catch( err => {
        console.error( "failed to fetch qlstats data for user " + steam_id );
        console.error( err );
        console.error( err.stack );
        resolve(ratings);
      });

    });

  });

};


module.exports.query = query;
module.exports.query_server_players = query_server_players;
module.exports.get_player_ratings = get_player_ratings;
Object.defineProperty(module.exports, "skill_rating", {
  get: function() { return skill_rating; }
});
