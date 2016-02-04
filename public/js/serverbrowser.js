var Location = React.createClass({
	render: function() {
		return (
			<td>
				<img src={"http://qlstats.net/static/images/flags/" + this.props.geo.country.toLowerCase() + ".png"} />
				<span>{this.props.geo.city}</span>
			</td>
		);
	}
});

var GameType = React.createClass({
	render: function() {
		// why not "ad" for "Attack and Defend"?
		// 'cos my adblock blocks it
		var original_factory = ['ffa', 'duel', 'race', 'tdm', 'ca', 'ctf', '1f', 'wut?', 'har', 'ft', 'dom', 'atatadedede', 'rr'][this.props.id];
		return (
			<td>
				<img src={"images/" + original_factory + ".png"} />
			</td>
		);
	}
});

var Server = React.createClass({
	render: function() {
		if (typeof(this.props.data.error) != 'undefined') {
			return (<tr style={{display: 'none'}}></tr>);
		}
		
		if (this.props.data.players.length == 0) {
			return (<tr style={{display: 'none'}}></tr>);
		}
		
		
		return (
			<tr>
				<Location geo={this.props.data.geo} />
				<GameType id={this.props.data.raw.rules.g_gametype} />
				<td>{this.props.data.players.length}</td>
				<td><a href={"steam://connect/" + this.props.endpoint}>connect</a></td>
			</tr>
		);
	}
});

var ServerList = React.createClass({
	getInitialState: function() {
		return {serverList: {}};
	},
	
	downloadServerList: function() {
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			cache: false,
			success: function(data) {
				this.setState({serverList: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	
	componentDidMount: function() {
		this.downloadServerList();
	},
	
	render: function() {
		var state = this.state;
		var result = Object.keys(this.state.serverList).map(function(endpoint) {
			return (<Server data={state.serverList[endpoint]} endpoint={endpoint} />);
		});
		return (<table><tbody>{result}</tbody></table>);
	}
});

ReactDOM.render(
	<ServerList url="/serverlist" />,
	document.getElementById('content')
);
