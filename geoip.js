var fs = require('fs');

var http = require('http');
var cache = require('./geoip.json');

var lookup = function(host, done, fuck) {
	if (typeof(cache[host]) == 'undefined') {
		/*
		var options = {
			host: 'ip-api.com',
			port: 80,
			path: "/json/" + host,
		};
		// */
		// if you are banned for some reason in ip-api.com, use webproxy like below
		//*
		var options = {
			host: 'new.great-windmill.com',
			port: 80,
			path: "/js/upload/browse.php?u=http%3A%2F%2Fip-api.com%2Fjson%2F" + host,
		};
		// 
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
		}).on('error', function(yourself) {
			fuck(yourself);
		});
	} else {
		done(cache[host]);
	}
}

module.exports.lookup = lookup;
