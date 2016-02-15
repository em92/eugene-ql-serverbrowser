var gsq = require("game-server-query");
var express = require('express');
var fs = require('fs');
var geoip = require('./geoip.js');

var app = express();
var servers = fs.readFileSync('servers.txt').toString().split("\n");
var serverInfo = {};

var updateServerInfo = function(server_index) {
	if (typeof server_index == 'undefined') {
		console.log('-------------------------');
		console.log('updateServerInfo -- start');
		server_index = 0;
	}
	
	if (server_index >= servers.length) {
		console.log('updateServerInfo -- fin');
		console.log('-----------------------');
		setTimeout(updateServerInfo, 30000);
		return;
	}
	
	var server = servers[server_index];
	var host = server.split(':')[0];
	var port = parseInt(server.split(':')[1]);
	gsq({ type: "synergy", host: host, port: port }, function(state) {
		if (state.error) {
			console.log(server_index + "	:" + state.error + " " + server)
		} else {
			delete state.query;
			
			state.players = state.players.filter(function(player) {
				return (player.time < 43200);
			});
			
			geoip.lookup(host, function(data) {
				state['geo'] = data;
				serverInfo[server] = state;
				console.log(server_index + "	: " + server)
			});
		}
		
		updateServerInfo(server_index + 1);
	});
};

var checkServerUsingFilterData = function(server, filter_data, checking_key) {
	// return values:
	// 1 - true
	// 0 - false
	// -1 - ignore
	var check_key_value = function(key, value) {
		switch(key) {
			case 'g_gamestate':
			case 'g_gametype':
			case 'g_instagib':
			case 'mapname':
				return server.gameinfo[key] == value;
			
			case 'min_players':
				return server.gameinfo.players.length >= value;
			
			default:
				return -1;
		}
	};
	
	if (typeof checking_key == 'undefined') {
		checking_key = "_";
	}
	
	if (checking_key[0] == "_") {
		if (Array.isArray(filter_data)) {
			for(var i in filter_data) {
				if (checkServerUsingFilterData(server, filter_data[i]) == 1) {
					return 1;
				}
			}
			return 0;
		} else if (typeof filter_data == 'object') {
			for(var i in filter_data) {
				console.log("hey -- " + i);
				if (checkServerUsingFilterData(server, filter_data[i], i) == 0) {
					return 0;
				}
			}
			return 1;
		} else {
			return -1;
		}
	} else {
		if (Array.isArray(filter_data)) {
			for(var i in filter_data) {
				if (check_key_value(checking_key, filter_data[i]) == 1) {
					return 1;
				}
			}
			return 0;
		} else if (typeof filter_data == 'object') {
			for(var i in filter_data) {
				if (check_key_value(checking_key, filter_data[i]) == 0) {
					return 0;
				}
			}
			return 1;
		} else {
			return check_key_value(checking_key, filter_data);
		}
	}
};

var serverList = function(filter_data) {
	var result = [];
	for (var server in serverInfo) {
		if (!(serverInfo[server].raw.rules)) // 87.249.207.170:27961
			continue;
		result.push({
			host_address: server,
			host_name: serverInfo[server].name,
			location: serverInfo[server].geo,
			password: serverInfo[server].password,
			gameinfo: {
				bots: serverInfo[server].bot,
				g_customSettings: serverInfo[server].raw.rules.g_customSettings ? parseInt(serverInfo[server].raw.rules.g_customSettings) : 0,
				g_gamestate: serverInfo[server].raw.rules.g_gameState,
				g_gametype: parseInt(serverInfo[server].raw.rules.g_gametype),
				g_instagib: serverInfo[server].raw.rules.g_instaGib ? parseInt(serverInfo[server].raw.rules.g_instaGib) : 0,
				mapname: serverInfo[server].raw.rules.mapname.toLowerCase(),
				players: serverInfo[server].players,
				sv_maxclients: serverInfo[server].raw.rules.sv_maxclients ? parseInt(serverInfo[server].raw.rules.sv_maxclients): 32,
				teamsize: parseInt(serverInfo[server].raw.rules.teamsize)
			}
		});
	}
	if (typeof filter_data != 'undefined') {
		try {
			filter_data = (new Buffer(filter_data, 'base64')).toString();
			filter_data = JSON.parse(filter_data);
		} catch(e) {
			return {error: 'invalid filter data'};
		}
		result = result.filter(function(server) {
			return (checkServerUsingFilterData(server, filter_data) == 1);
		});
	}
	return {servers: result};
};

app.get('/serverlist/:filter_data', function (req, res) {
	res.setHeader("Content-Type", "application/json");
	res.send(serverList(req.params.filter_data));
});

app.get('/serverlist', function (req, res) {
	res.setHeader("Content-Type", "application/json");
	res.send(serverList());
});

app.get('/rawserverlist', function (req, res) {
	res.setHeader("Content-Type", "application/json");
	res.send(serverInfo);
});

app.use(express.static('public'));

app.listen(3000, function () {
	console.log("Eugene's Quake Live Server Browser started on port 3000");
	updateServerInfo();
});
