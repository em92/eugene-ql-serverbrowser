var fs = require('fs');

var http = require('http');
var cache = require('./geoip.json');

var lookup = function(host, done) {
	if (typeof(cache[host]) == 'undefined') {
		var options = {
			host: 'api.db-ip.com',
			port: 80,
			path: "/addrinfo?addr=" + host + "&api_key=b2a0e4d8d0d0c2c8c85d6119b95770880edf34ee",
		};
		http.get(options, function(response) {
			var data = "";
			response.on("data", function(chunk) {
				data += chunk;
			});
			response.on("end", function() {
				console.log(data);
				data = JSON.parse(data);
				cache[host] = {country: data.country, city: data.city.split(" (")[0]};
				fs.writeFile("./geoip.json", JSON.stringify(cache)); 
				done(cache[host]);
			});
		});
	} else {
		done(cache[host]);
	}
}

module.exports.lookup = lookup;
