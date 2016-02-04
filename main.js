var gsq = require("game-server-query");
var express = require('express');
var geoip = require('./geoip.js');

var app = express();
var servers = [
	'88.86.218.162:27967',
	'95.46.228.44:27960',
	'5.19.249.101:27961',
	'188.243.62.185:27970',
	'178.124.139.88:27968',
	'191.101.124.150:27968',
	'46.101.115.163:27996',
	'91.233.116.131:27968',
	'108.61.179.83:27972',
	'46.101.38.69:27964',
	'149.154.159.218:27968',
	'144.76.70.86:27963',
	'52.29.250.131:27983',
	'46.101.144.236:27970',
	'185.53.128.47:27960',
	'89.19.231.151:27962',
	'52.28.225.214:27961',
	'37.120.189.26:27960',
	'37.187.121.118:27960',
	'45.32.152.11:27970',
	'212.224.101.180:27962',
	'109.72.82.220:27960',
	'84.200.38.143:27960'
];
var serverInfo = {};

var updateServerInfo = function() {
	servers.forEach(function(server) {
		var host = server.split(':')[0];
		var port = parseInt(server.split(':')[1]);
		gsq({ type: "synergy", host: host, port: port }, function(state) {
			geoip.lookup(host, function(data) {
				state['geo'] = data;
				serverInfo[server] = state;
			});
		});
	});
};

app.get('/serverlist', function (req, res) {
	res.setHeader("Content-Type", "application/json");
	res.send(serverInfo);
});

app.use(express.static('public'));

updateServerInfo();
setInterval(updateServerInfo, 30000);

app.listen(3000, function () {
	console.log("Eugene's Quake Live Server Browser started on port 3000");
});
