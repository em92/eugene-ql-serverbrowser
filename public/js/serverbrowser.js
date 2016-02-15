var Location = React.createClass({
	displayName: "Location",

	render: function render() {
		return React.createElement(
			"td",
			null,
			React.createElement("img", { src: "http://qlstats.net/static/images/flags/" + this.props.geo.country.toLowerCase() + ".png" }),
			React.createElement(
				"span",
				null,
				this.props.geo.city
			)
		);
	}
});

var GameType = React.createClass({
	displayName: "GameType",

	render: function render() {
		// why not "ad" for "Attack and Defend"?
		// 'cos my adblock blocks it
		var original_factory = ['ffa', 'duel', 'race', 'tdm', 'ca', 'ctf', '1f', 'wut?', 'har', 'ft', 'dom', 'atatadedede', 'rr'][this.props.id];
		return React.createElement(
			"td",
			null,
			React.createElement("img", { src: "images/" + original_factory + ".png" })
		);
	}
});

var PlayerCount = React.createClass({
	displayName: "PlayerCount",

	render: function render() {
		var d = [
			this.props.server.gameinfo.sv_maxclients, // ffa
			this.props.server.gameinfo.sv_maxclients, // duel
			this.props.server.gameinfo.sv_maxclients, // race
			this.props.server.gameinfo.teamsize*2,  // tdm,
			this.props.server.gameinfo.teamsize*2, // ca
			this.props.server.gameinfo.teamsize*2, // ctf
			this.props.server.gameinfo.teamsize*2, // 1f, 
			0, // wut?
			this.props.server.gameinfo.teamsize*2, // har
			this.props.server.gameinfo.teamsize*2, // ft
			this.props.server.gameinfo.teamsize*2, // dom,
			this.props.server.gameinfo.teamsize*2, // ad
			this.props.server.gameinfo.sv_maxclients, // rr
		][this.props.server.gameinfo.g_gametype];
		if (d == 0) {
			d = this.props.server.gameinfo.sv_maxclients;
		}
		return React.createElement(
			"td",
			null,
			this.props.server.gameinfo.players.length + "/" + d
		)
	}
});

var Server = React.createClass({
	displayName: "Server",

	render: function render() {
		if (this.props.server.gameinfo.players.length == 0) {
			return React.createElement("tr", { style: { display: 'none' } });
		}

		return React.createElement(
			"tr",
			null,
			React.createElement(Location, { geo: this.props.server.location }),
			React.createElement(GameType, { id: this.props.server.gameinfo.g_gametype }),
			React.createElement(
				"td",
				null,
				this.props.server.host_name
			),
			React.createElement(
				"td",
				null,
				this.props.server.gameinfo.mapname
			),
			React.createElement(PlayerCount, { server: this.props.server }),
			React.createElement(
				"td",
				null,
				React.createElement(
					"a",
					{ href: "steam://connect/" + this.props.server.host_address },
					"connect"
				)
			)
		);
	}
});

var ServerList = React.createClass({
	displayName: "ServerList",

	getInitialState: function getInitialState() {
		return { servers: [] };
	},

	downloadServerList: function downloadServerList() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: (function (data) {
				this.setState(data);
			}).bind(this),
			error: (function (xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}).bind(this)
		});
	},

	componentDidMount: function componentDidMount() {
		this.downloadServerList();
	},

	render: function render() {
		var state = this.state;
		var result = state.servers.map(function (server) {
			return React.createElement(Server, { server: server });
		});
		return React.createElement(
			"table",
			null,
			React.createElement(
				"tbody",
				null,
				result
			)
		);
	}
});

var FilterOptions = React.createClass({
	displayName: "FilterOptions",
	
	render: function render() {
		return React.createElement(
			"div", null,
			React.createElement("textarea", null),
			React.createElement("br", null),
			React.createElement("button", null, "Filter")
		);
	}
});

var MainContent = React.createClass({
	displayName: "MainContent",
	
	render: function render() {
		return React.createElement(
			"div", null,
			React.createElement(FilterOptions, null),
			React.createElement(ServerList, { url: "/serverlist" })
		);
	}
});

