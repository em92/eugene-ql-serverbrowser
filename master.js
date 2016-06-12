var request = require('request');

var query = function(done, fuck) {
	console.log("Querying syncore's server list");
	request('https://ql.syncore.org/api/servers', {timeout: 5000}, function (error, response, body) {
		if (error) {
			fuck(error);
		} else {
			if (response.statusCode != 200) {
				fuck({message: "statustCode: " + response.statusCode.toString()});
			} else {
				data = JSON.parse(body);
				servers = data.servers.map(function(item) {
					return item.address;
				});
				done(servers);
			}
		}
	});
};

module.exports.query = query;
