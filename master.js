var https = require('https');

var query = function(done, fuck) {
	console.log("Querying syncore's server list");
	https.get('https://ql.syncore.org/api/servers', function(res) {
		var data = "";
		res.on('data', function(chunk) {
			data += chunk;
		});
		res.on("end", function() {
			data = JSON.parse(data);
			servers = data.servers.map(function(item) {
				return item.address;
			});
			
			done(servers);
		});
	
	}).on('error', function(yourself) {
		fuck(yourself);
	});
};

module.exports.query = query;
