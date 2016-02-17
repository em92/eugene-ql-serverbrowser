var Location = React.createClass({
	displayName: "Location",

	render: function render() {
		return React.createElement(
			"td",
			null,
			React.createElement("div", { className: "flag flag-" + this.props.geo.country.toLowerCase() }),
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
		var original_factory = [
			[['Free For All'], ['InstaFFA']],
			[['Duel'], ['InstaDuel']],
			[['Race'], ['Race']],
			[['Team Deathmatch'], ['InstaTDM']],
			[['Clan Arena'], ['InstaCA']],
			[['Capture the Flag'], ['InstaCTF']],
			[['1-Flag CTF'], ['Insta1FCTF']],
			[['wut?'], ['wat?']],
			[['Harvester'], ['InstaHAR']],
			[['Freeze Tag'], ['InstaFreeze']],
			[['Domination'], ['InstaDOM']],
			[['Attack and Defend'], ['InstaAD']],
			[['Red Rover'], ['InstaRR']]
		][this.props.server.gameinfo.g_gametype][this.props.server.gameinfo.g_instagib];
		
		return React.createElement("td", null, original_factory);
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
		return React.createElement(
			"tr",
			null,
			React.createElement(Location, { geo: this.props.server.location }),
			React.createElement(GameType, { server: this.props.server }),
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

var FilterOptions = React.createClass({
	displayName: "FilterOptions",
	
	getInitialState: function() {
		if (typeof this.props.filterData == "undefined") {
			return { jsonValid: true, filterData: "" };
		} else {
			try {
				filterData = window.atob(this.props.filterData);
				JSON.parse(filterData);
				return { jsonValid: true, filterData: filterData };
			} catch(e) {
				return { jsonValid: false, filterData: filterData };
			}
		}
	},
	
	onClick: function(event) {
		this.props.acceptFilterCallback(this.state.filterData);
	},
	
	onChange: function(event) {
		try {
			JSON.parse(event.target.value);
			this.setState({jsonValid: true, filterData: event.target.value })
		} catch(e) {
			this.setState({jsonValid: false, filterData: event.target.value })
		}
	},
	
	render: function render() {
		return React.createElement(
			"div", null,
			React.createElement("textarea", {rows: 5, cols: 120, onChange: this.onChange, value: this.state.filterData}),
			React.createElement("br", null),
			React.createElement("button", {onClick: this.onClick, disabled: !this.state.jsonValid}, "Filter")
		);
	}
});

var ServerList = React.createClass({
	displayName: "ServerList",

	filterData: "/" + window.location.hash.substring(1),
	
	getInitialState: function getInitialState() {
		return { servers: [] };
	},
	
	acceptFilter: function(filterDataIn) {
		this.filterData = "/" + window.btoa(filterDataIn);
		this.downloadServerList();
	},

	downloadServerList: function downloadServerList() {
		$.ajax({
			url: "/serverlist" + this.filterData,
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
		setInterval(this.downloadServerList, 60000);
	},

	render: function render() {
		var state = this.state;
		var result = state.servers.map(function (server) {
			return React.createElement(Server, { server: server });
		});
		
		var header = React.createElement("thead", null, React.createElement("tr", null,
			React.createElement("th", null, "Location"),
			React.createElement("th", null, "Gametype"),
			React.createElement("th", null, "Hostname"),
			React.createElement("th", null, "Map"),
			React.createElement("th", null, "Players"),
			React.createElement("th", null, ":3")
		));
		
		return React.createElement('div', null,
			React.createElement(FilterOptions, {acceptFilterCallback: this.acceptFilter, filterData: window.location.hash.substring(1)}),
			React.createElement("table", null,
				header,
				React.createElement("tbody", null, result)
			)
		);
	}
});
