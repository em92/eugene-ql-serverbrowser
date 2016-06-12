var fs = require('fs');
var request = require('request');
var cache = require('./geoip.json');

var lookup = function(host, done, fuck) {
	if (typeof(cache[host]) == 'undefined') {
		request('http://ip-api.com/json/' + host, {timeout: 5000}, function (error, response, body) {
			if (error) {
				fuck(error);
			} else {
				if (response.statusCode != 200) {
					fuck({message: "statustCode: " + response.statusCode.toString()});
				} else {
					data = JSON.parse(body);
					cache[host] = {country: data.countryCode, city: data.city.split(" (")[0]};
					console.log(cache[host]);
					fs.writeFile("./geoip.json", JSON.stringify(cache));
					done(cache[host]);
				}
			}
		});
	} else {
		done(cache[host]);
	}
}

module.exports.lookup = lookup;
