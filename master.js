var rp = require('request-promise');

var servers = [];

var query = function() {
  //console.log("Querying syncore's server list");
  
  var options = {
    uri: 'https://ql.syncore.org/api/servers',
    timeout: 5000,
    json: true
  };
  
  return rp(options)
  .then( data => {
    if (data.servers.length == 0) return;
    servers = data.servers.map(function(item) {
      return item.address;
    });
  })
  .catch( error => {
    console.error("master.query");
    throw error;
  });
};

module.exports.query = query;
Object.defineProperty(module.exports, "servers", {
  get: function() { return servers; }
});
