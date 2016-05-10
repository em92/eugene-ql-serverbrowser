var os = require("os");
if (os.hostname() == "pc-eugene") {
	// FixMe: on my Windows XP discord.js is NOT installed for some reason
	// Why? I recv node.h not found bebebe
	module.exports.status = {"FixMe": "not working in pc-eugene"};
	
} else {

var Discord = require("discord.js");
var fs = require('fs');
var conf = require('./discord.conf.json');

var mybot = new Discord.Client();

var status = {
	"overfrag-ictf": "n/a",
	"overfrag-ift": "n/a",
	"overfrag-ftag": "n/a",
	"ru-pickup-ctf": "n/a",
	"ru-pickup-tdm": "n/a"
};

mybot.on("message", function(message) {
	if ( (message.channel.id == '139135984892641280') && (message.author.id == '138645497454919680') ) { // overfrag pickup channel && pickup bot
		var status_names = message.content.match(/\w*:/g);
		if (status_names == null)
			return;
		status_names = status_names.map(function(item) {
			return item
				.replace("ictf:", "overfrag-ictf")
				.replace("ift:", "overfrag-ift")
				.replace("ftag:", "overfrag-ftag");
		}).filter(function(item) {
			return (item != "for:") && (item != "from:");
		});
		
		// if pickup started
		if ( status_names.some(function(item) {return item == 'Captains:'}) ) {
			mybot.sendMessage(message.channel, "!who");
			return;
		}
		
		var status_values = message.content.match(/\[(.*?)\]/g);
		
		status_names.forEach(function(item, i) {
			if (typeof(status[item]) == "string")  {
				status[item] = status_values[i].replace("[", "").replace("]", "");
			}
		});
	}
});

mybot.login(conf.email, conf.password);

module.exports.status = status;

}
