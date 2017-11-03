var rp = require('request-promise');
var error_handler = require('./common.js').rp_error_handler;

var servers = [];

if (!process.env.STEAM_WEB_API_KEY) {
  console.error("environment variable STEAM_WEB_API_KEY is not set. quitting...");
  process.exit(1);
}

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
  .catch( error_handler );
};

module.exports.query = query;
Object.defineProperty(module.exports, "servers", {
  get: function() { return servers; }
});
