var rp = require('request-promise');

var query = function() {
  console.log("Querying syncore's server list");
  
  var options = {
    uri: 'https://ql.syncore.org/api/servers',
    timeout: 5000,
    json: true
  };
  
  return rp(options)
  .then( data => {
    console.log("recved " + data.servers.length + " servers");
    return data.servers.map(function(item) {
      return item.address;
    });
  });
};

module.exports.query = query;
