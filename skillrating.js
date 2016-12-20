var rp = require('request-promise');
var error_handler = require('./master.js').rp_error_handler;

var skill_rating = {};

var query = function() {
  var options = {
    uri: 'http://api.qlstats.net/api/server/skillrating',
    timeout: 5000,
    json: true
  };
  
  return rp(options)
  .then( data => {
    server_ips = {};
    skill_rating = {}
    data.forEach(function(item) {
      var address = item.server;
      delete item.server;
      skill_rating[ address ] = item;
    });
  })
  .catch( error_handler );
};

var query_server_players = function( address ) {
  var options = {
    uri: 'http://api.qlstats.net/api/server/' + address + '/players',
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
