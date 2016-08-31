var rp = require('request-promise');

var server_ips = {};
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
      server_ips[ address.split(":")[0] ] = 1;
      skill_rating[ address ] = item;
    });
  });
};

module.exports.query = query;
Object.defineProperty(module.exports, "server_ips", {
  get: function() { return server_ips; }
});
Object.defineProperty(module.exports, "skill_rating", {
  get: function() { return skill_rating; }
});
