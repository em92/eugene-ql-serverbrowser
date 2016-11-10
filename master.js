var rp = require('request-promise');

var servers = [];

var query = function() {
  var options = {
    uri: 'https://api.steampowered.com/IGameServersService/GetServerList/v1/?key='+process.env.STEAM_WEB_API_KEY+'&filter=appid%5C282440&limit=100000',
    timeout: 5000,
    json: true
  };

  return rp(options)
  .then( data => {
    data = data.response;
    if (data.servers.length == 0) return;
    servers = data.servers.map(function(item) {
      return item.addr;
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
