var rp = require('request-promise');

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
  });
};

module.exports.query = query;
Object.defineProperty(module.exports, "skill_rating", {
  get: function() { return skill_rating; }
});
