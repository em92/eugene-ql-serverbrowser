var rp = require('request-promise');
var error_handler = require('./master.js').rp_error_handler;

var skill_rating = {};
var ZMQ_TO_GAME_ADDR_DATA = {
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


module.exports.query = query;
module.exports.query_server_players = query_server_players;
Object.defineProperty(module.exports, "skill_rating", {
  get: function() { return skill_rating; }
});
