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

var GameTypeTabHead = React.createClass({
	displayName: "GameTypeTabHead",
	
	onSelected: function() {
		this.props.onGametypeSelectedCallback(this.props.index);
	},
	
	render: function() {
		return React.createElement(
			"div",
			{onClick: this.onSelected, className: "gametypetabhead" + (this.props.working ? " selected" : "")},
			this.props.factory
		);
	}
});

var GametypeSettings = React.createClass({
	displayName: "GametypeSettings",
	
	getInitialState: function() {
		var state = {
			settings: {}
		};
		var active = (typeof(window.localStorage[this.props.factory]) == 'undefined') ? true : window.localStorage[this.props.factory] == 'true';
		
		this.props.setGametypeSettings(this.props.index, active);
		
		return $.extend({active: active}, state);
	},
	
	onChangeActive: function(value) {
		window.localStorage[this.props.factory] = value;
		this.setState({active: value, settings: this.state.settings});
		if (value == false) {
			this.props.setGametypeSettings(this.props.index, null);
		} else {
			this.props.setGametypeSettings(this.props.index, this.state.settings);
		}
	},
	
	toggle: function() {
		
	},
	
	render: function() {
		return React.createElement(
			"div",
			{className: "gamesettings"},
			React.createElement(
				"div",
				{className: "gamesetting"},
				React.createElement('div', {className: "key"}, "Show this gametype"),
				React.createElement('div', {className: "val"},
					React.createElement('input', {type: 'checkbox', onChange: this.onChangeActive})
				)
			)
		);
	}
});
// */

// только показывает
var Settings = React.createClass({
	displayName: "Settings",
	
	getInitialState: function() {
		return { selectedFactoryIndex: 0 };
	},
	
	factories: [
		{factory: 'FFA',	factory_settings: {g_gametype: 0, g_instagib: 0}},
		{factory: 'Duel',	factory_settings: {g_gametype: 1}},
		{factory: 'Race',	factory_settings: {g_gametype: 2}},
		{factory: 'TDM',	factory_settings: {g_gametype: 3}},
		{factory: 'CA',		factory_settings: {g_gametype: 4}},
		{factory: 'CTF',	factory_settings: {g_gametype: 5, g_instagib: 0}},
		{factory: '1F',		factory_settings: {g_gametype: 6}},
		{factory: 'HAR',	factory_settings: {g_gametype: 8}},
		{factory: 'FT',		factory_settings: {g_gametype: 9, g_instagib: 0}},
		{factory: 'DOM',	factory_settings: {g_gametype: 10}},
		{factory: 'A&D',	factory_settings: {g_gametype: 11}},
		{factory: 'RR',		factory_settings: {g_gametype: 12}},
		{factory: 'iFFA',	factory_settings: {g_gametype: 0, g_instagib: 1}},
		{factory: 'iCTF',	factory_settings: {g_gametype: 5, g_instagib: 1}},
		{factory: 'iFT',	factory_settings: {g_gametype: 9, g_instagib: 1}}
	],
	
	onGametypeSelectedCallback: function(key) {
		this.setState({selectedFactoryIndex: key});
	},
	
	onGametypeSettingsChanged: function(factory_index, value) {
		this.factories[factory_index].settings = value;
		console.table(this.factories);
	},
	
	render: function() {
		var that = this;
		var heads = this.factories.map(function (e, i) {
			return React.createElement(GameTypeTabHead, $.extend(e, {working: that.state.selectedFactoryIndex == i, onGametypeSelectedCallback: that.onGametypeSelectedCallback, index: i, key: i}));
		});
		
		return React.createElement(
			"div", {className: 'settings'},
			heads,
			React.createElement(GametypeSettings,
				$.extend({setGametypeSettings: this.onGametypeSettingsChanged}, this.factories[this.state.selectedFactoryIndex])
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
	
	render: function() {
		return React.createElement(
			"div", null,
			React.createElement("textarea", {rows: 5, cols: 120, onChange: this.onChange, value: this.state.filterData}),
			React.createElement("br", null),
			React.createElement("button", {onClick: this.onClick, disabled: !this.state.jsonValid}, "Filter"),
			React.createElement(Settings)
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
