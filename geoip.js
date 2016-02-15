var fs = require('fs');

var http = require('http');
var cache = require('./geoip.json');

var lookup = function(host, done) {
	if (typeof(cache[host]) == 'undefined') {
		var options = {
			host: 'ip-api.com',
			port: 80,
			path: "/json/" + host,
		};
		http.get(options, function(response) {
			var data = "";
			response.on("data", function(chunk) {
				data += chunk;
			});
			response.on("end", function() {
				data = JSON.parse(data);
				cache[host] = {country: data.countryCode, city: data.city.split(" (")[0]};
				console.log(cache[host]);
				fs.writeFile("./geoip.json", JSON.stringify(cache)); 
				done(cache[host]);
			});
		});
	} else {
		done(cache[host]);
	}
}

module.exports.lookup = lookup;
