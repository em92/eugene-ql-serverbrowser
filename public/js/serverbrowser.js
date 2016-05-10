var Location = React.createClass({
	displayName: "Location",

	render: function() {
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

	render: function() {
		try {
			var original_factory = [
				[['FFA'], ['InstaFFA']],
				[['Duel'], ['InstaDuel']],
				[['Race'], ['Race']],
				[['TDM'], ['InstaTDM']],
				[['CA'], ['InstaCA']],
				[['CTF'], ['InstaCTF']],
				[['1FCTF'], ['Insta1FCTF']],
				[['wut?'], ['the fuck?']],
				[['HAR'], ['InstaHAR']],
				[['FT'], ['InstaFT']],
				[['DOM'], ['InstaDOM']],
				[['A&D'], ['InstaA&D']],
				[['RR'], ['InstaRR']]
			][this.props.server.gameinfo.g_gametype][this.props.server.gameinfo.g_instagib];
			return React.createElement("td", null, original_factory);
		} catch(e) {
			console.error(e);
			console.log(this.props);
			return null;
		}

	}
});

var PlayerCount = React.createClass({
	displayName: "PlayerCount",

	render: function() {
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

	render: function() {
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
		if (typeof(this.props.filterData) == "undefined") {
			return { jsonValid: true, filterData: "" };
		} else {
			try {
				JSON.parse(this.props.filterData);
				return { jsonValid: true, filterData: this.props.filterData};
			} catch(e) {
				return { jsonValid: false, filterData: this.props.filterData};
			}
		}
	},
	
	onClick: function(event) {
		this.examplePressed = false;
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
	
	// I don't need it in this.state
	// Will remove example someday
	examplePressed: false,
	onExample: function(event) {
		
		var example_filter = ' \
{"region": "EU", "min_players": 1, "_": [ \n\
{"g_gametype": 0, "g_instagib": 1}, \n\
{"g_gametype": 1, "mapname": ["longestyard", "q3dm17"]}, \n\
{"g_gametype": 5, "g_instagib": 1}, \n\
{"g_gametype": 4, "country": ["RU", "UA"]} \n\
]}';
		try {
			JSON.parse(example_filter);
			this.examplePressed = true;
			this.setState({jsonValid: true, filterData: example_filter })
		} catch(e) {
			this.setState({jsonValid: false, filterData: example_filter })
		}
	},
	
	render: function() {
		return React.createElement(
			"div", null,
			React.createElement("textarea", {rows: 5, cols: 120, onChange: this.onChange, value: this.state.filterData}),
			React.createElement("br", null),
			React.createElement("button", {onClick: this.onClick, disabled: !this.state.jsonValid}, this.state.jsonValid ? "Submit" : "Invalid filter"),
			React.createElement("button", {onClick: this.onExample}, "Example"),
			this.examplePressed ? React.createElement("br", null): null,
			this.examplePressed ? React.createElement("div", {style: {backgroundColor: "white", border: "1px solid blue", marginTop: "5px", marginBottom: "5px"} }, 
				React.createElement("p", null, "This example filter. Meaning:"),
				React.createElement("ul", null, 
					React.createElement("li", null, "Server must be in Yurope, not empty and any cases of below"),
					React.createElement("li", null, "Gametype - InstaFFA"),
					React.createElement("li", null, "Gametype - Duel on Longest Yard (ql) or The Longest Yard (q3)"),
					React.createElement("li", null, "Gametype - InstaCTF"),
					React.createElement("li", null, "Gametype - Clanarena in Russia or Ukraine")
				),
				React.createElement("p", null, "Now press submit button"),
				React.createElement("p", null, "When I have good mood I will write user-friendly filter and/or documentation")
			) : null
			
		);
	}
});

var ServerList = React.createClass({
	displayName: "ServerList",

	getInitialState: function() {
		return { servers: [] };
	},
	
	acceptFilter: function(filterDataIn) {
		window.localStorage.setItem('filterData', filterDataIn);
		this.filterData = "/" + window.btoa(filterDataIn);
		this.downloadServerList();
	},

	downloadServerList: function() {
		$.ajax({
			url: "serverlist" + this.filterData,
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

	componentDidMount: function() {
		this.filterData = window.localStorage.filterData ? "/" + window.btoa(window.localStorage.filterData) : "";
		this.downloadServerList();
		setInterval(this.downloadServerList, 60000);
	},

	render: function() {
		var state = this.state;
		var result = state.servers.map(function (server, i) {
			return React.createElement(Server, { server: server, key: i });
		});
		
		var header = React.createElement("thead", null, React.createElement("tr", null,
			React.createElement("th", null, "Location"),
			React.createElement("th", null, "Gametype"),
			React.createElement("th", null, "Hostname"),
			React.createElement("th", null, "Map"),
			React.createElement("th", null, "Players"),
			React.createElement("th", null, "Connect")
		));
		
		return React.createElement('div', null,
			React.createElement(FilterOptions, {acceptFilterCallback: this.acceptFilter, filterData: window.localStorage.filterData}),
			React.createElement("table", null,
				header,
				React.createElement("tbody", null, result)
			)
		);
	}
});
