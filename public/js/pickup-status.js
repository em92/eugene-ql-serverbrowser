var PickupStatus = React.createClass({
	getInitialState: function() {
		return {
			"overfrag-ictf": "n/a",
			"overfrag-ift": "n/a",
			"overfrag-ftag": "n/a",
			"ru-pickup-ctf": "n/a",
			"ru-pickup-tdm": "n/a"
		};
	},
	
	check: function() {
		$.ajax({
			url: "pickup-status.json",
			dataType: 'json',
			cache: false,
			success: (function (data) {
				this.setState(data);
			}).bind(this),
			error: (function (xhr, status, err) {
				console.error(status, err.toString());
			}).bind(this)
		});
	},

	componentDidMount: function() {
		this.check();
		setInterval(this.check, 10000);
	},

	render: function() {
		var result = [];
		for(pickup in this.state) {
			if ( (this.state[pickup] != 'n/a') && (this.state[pickup][0] != '0') ) {
				result.push(React.createElement("tr", null, 
					React.createElement("td", null, pickup),
					React.createElement("td", null, this.state[pickup])
				));
			}
		}
		if (result.length == 0)
			return null;
		
		var header = React.createElement("thead", null, React.createElement("tr", null,
			React.createElement("th", null, "Pickup"),
			React.createElement("th", null, "Players")
		));
		
		return React.createElement("table", null, header, React.createElement("tbody", null, result));
	}
});
