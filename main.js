var gsq = require("game-server-query");
var express = require('express');
var geoip = require('./geoip.js');
var master = require('./master.js');

var app = express();
var servers = [];
var serverInfo = {};
var time_to_update_server_list = true;

var UPDATE_SERVER_INFO_THREADS_COUNT = 10;
var UPDATE_SERVER_INFO_PERIOD = 10;
var UPDATE_SERVER_LIST_INTERVAL_SECONDS = 60*60;
var MAX_SERVER_OUTPUT_COUNT = 100;

setInterval(function() {
	time_to_update_server_list = true;
}, UPDATE_SERVER_LIST_INTERVAL_SECONDS*1000);

var updateServerInfo = function(server_index) {
	if (typeof server_index == 'undefined') {
		if (time_to_update_server_list == true) {
			master.query(function(result) {
				// on success
				time_to_update_server_list = false;
				servers = result;
				updateServerInfo();
			}, function(e) {
				// on fail
				console.error(e);
				updateServerInfo();
			});
			return;
		}
	
		console.log('-------------------------');
		console.log('updateServerInfo -- start');
		for(var i=0; i<UPDATE_SERVER_INFO_THREADS_COUNT; i++) {
			updateServerInfo(i);
		}
		return;
	}
	
	if (server_index == servers.length) {
		console.log('--------');
		console.log('thread #' + server_index%UPDATE_SERVER_INFO_THREADS_COUNT + ': fin');
		console.log('--------');
		//setTimeout(updateServerInfo, UPDATE_SERVER_INFO_PERIOD*1000);
		return;
	} else if (server_index > servers.length) {
		console.log('--------');
		console.log('thread #' + server_index%UPDATE_SERVER_INFO_THREADS_COUNT + ': fin');
		console.log('--------');
		return;
	}
	
	var server = servers[server_index];
	if (server == '')
		return;
	var host = server.split(':')[0];
	var port = parseInt(server.split(':')[1]);
	try {
		gsq({ type: "synergy", host: host, port: port }, function(state) {
			if (state.error) {
				console.log(server_index + "	:" + state.error + " " + server)
				if (typeof(serverInfo[server]) != "undefined") {
					if (typeof(serverInfo[server].error_cnt) == "undefined") {
						serverInfo[server].error_cnt = 1;
					} else if (serverInfo[server].error_cnt == 5) {
						delete serverInfo[server];
					} else {
						serverInfo[server].error_cnt += 1;
					}
				}
			} else {
				delete state.query;
				
				state.players = state.players.filter(function(player) {
					return (player.time < 43200);
				});
				
				try {
					state['geo'] = geoip.lookup(host);
					// some servers return g_gametype
					// some servers return g_gameType
					// lowercasing value names in state.raw.rules
					// not to have undefined errors
					try {
						for(key in state.raw.rules) {
							if (key != key.toLowerCase()) {
								state.raw.rules[key.toLowerCase()] = state.raw.rules[key];
								delete state.raw.rules[key];
							}
						}
						serverInfo[server] = state;
						console.log(server_index + "	: " + server);
					} catch (e) {
						console.error(server_index + "	: " + server + " - error: " + e.message);
					}
				} catch (e) {
					console.error(server_index + "	: " + server + " - geoip error: " + e.message);
				};
			}
			
			updateServerInfo(server_index + UPDATE_SERVER_INFO_THREADS_COUNT);
		});
	} catch (e) {
		console.error(server_index + "	: " + server + " - gsq error: " + e.message);
		updateServerInfo(server_index + UPDATE_SERVER_INFO_THREADS_COUNT);
	}
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
				return +( (server.gameinfo[key] == value) || (value == 'any') );
			
			case 'min_players':
				return +(server.gameinfo.players.length >= value);
			
			case 'region':
				return +(server.location.region == value.toUpperCase());
			
			case 'country':
				return +(server.location.country == value);
			
			case 'private':
				return +(server.password == value);
				
			case 'ip':
				return +(server.host_address.split(':')[0] == value);
				
			// +(bool) -> int
			default:
				return -1;
		}
	};
	
	if (typeof checking_key == 'undefined') {
		checking_key = "_";
	}
	
	if (checking_key[0] == "!") {
		var r = checkServerUsingFilterData(server, filter_data, checking_key.substring(1));
		switch(r) {
			case 1:
				return 0;
			
			case 0:
				return 1;
			
			default:
				return -1;
		}
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
				var result = -1;
				if (checkServerUsingFilterData(server, filter_data[i], i) == 0) {
					return 0;
				} else {
					result = 1;
				}
			}
			return result;
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
	var getGametypeByTags = function(tags) {
		var gametypeString = tags.split(",")[0];
		switch(gametypeString) {
			case 'ffa':
				return 0;
			
			case 'duel':
				return 1;
			
			case 'race':
				return 2;
			
			case 'tdm':
				return 3;
			
			case 'clanarena':
				return 4;
			
			case 'ctf':
				return 5;
			
			case 'oneflag':
				return 6;
			
			case 'har':
			case 'harvester':
				return 8;
			
			case 'freezetag':
				return 9;
			
			case 'domination':
				return 10;
			
			case 'a&d':
				return 11;
			
			case 'redrover':
			case 'rr':
				return 12;
			
			default:
				return 7;
		};
	};
	var isInstagibByTags = function(tags) {
		return tags.split(",").indexOf("instagib") == -1 ? 0 : 1;
	};
	var result = [];
	for (server in serverInfo) {
		try {
		result.push({
				host_address: server,
				host_name: serverInfo[server].name,
				location: serverInfo[server].geo,
				password: serverInfo[server].password,
				gameinfo: {
					bots: serverInfo[server].bots,
					g_gamestate: serverInfo[server].raw.rules ? serverInfo[server].raw.rules.g_gamestate : "n/a",
					g_gametype: serverInfo[server].raw.rules ? parseInt(serverInfo[server].raw.rules.g_gametype) : getGametypeByTags(serverInfo[server].raw.tags),
					g_instagib: serverInfo[server].raw.rules ? parseInt(serverInfo[server].raw.rules.g_instagib) : isInstagibByTags(serverInfo[server].raw.tags),
					mapname: serverInfo[server].map.toLowerCase(),
					players: serverInfo[server].players,
					sv_maxclients: serverInfo[server].raw.rules ? parseInt(serverInfo[server].raw.rules.sv_maxclients): serverInfo[server].maxplayers,
					teamsize: serverInfo[server].raw.rules ? parseInt(serverInfo[server].raw.rules.teamsize) : 0
				}
			});
		} catch(e) {
			console.error("serverList	: " + server + " - error: " + e.message);
		}
	};
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
	result = result.filter(function(server, i) {
		return i < MAX_SERVER_OUTPUT_COUNT;
	});
	result.sort(function(server1, server2) {
		if ( (server1.gameinfo.players.length > 0) && (server2.gameinfo.players.length == 0) )
			return -1;
		else if ( (server2.gameinfo.players.length > 0) && (server1.gameinfo.players.length == 0) )
			return 1;
		return 0;
	});
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

app.get('/serverinfo/:endpoint', function (req, res) {
	res.setHeader("Content-Type", "application/json");
	res.send(serverInfo[req.params.endpoint]);
});

app.use(express.static('public'));

app.listen(3000, function () {
	console.log("Eugene's Quake Live Server Browser started on port 3000");
	updateServerInfo();
});
