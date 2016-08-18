var GAMETYPES = {
  0: 'FFA',
  1: 'Duel',
  2: 'Race',
  3: 'TDM',
  4: 'CA',
  5: 'CTF',
  6: '1FCTF',
  8: 'HAR',
  9: 'FT',
  10: 'DOM',
  11: 'A&D',
  12: 'RR',
  100: 'InstaFFA',
  101: 'InstaDuel',
  103: 'InstaTDM',
  104: 'InstaCA',
  105: 'InstaCTF',
  106: 'Insta1FCTF',
  108: 'InstaHAR',
  109: 'InstaFT',
  110: 'InstaDOM',
  111: 'InstaA&D',
  112: 'InstaRR',
  "any": "any"
}

var MAPS = [
  "aerowalk",
  "almostlost",
  "arcanecitadel",
  "arkinholm",
  "asylum",
  "basesiege",
  "battleforged",
  "beyondreality",
  "bitterembrace",
  "blackcathedral",
  "bloodlust",
  "bloodrun",
  "brimstoneabbey",
  "campercrossings",
  "campgrounds",
  "cannedheat",
  "castledeathstalker",
  "chemicalreaction",
  "citycrossings",
  "cliffside",
  "coldcathode",
  "coldwar",
  "concretepalace",
  "corrosion",
  "courtyard",
  "cure",
  "cursed",
  "deadandgone",
  "deathorglory",
  "deepinside",
  "delirium",
  "demonkeep",
  "devilish",
  "diesirae",
  "dismemberment",
  "dividedcrossings",
  "divineintermission",
  "doubleimpact",
  "dreadfulplace",
  "dredwerkz",
  "drunkenmummy",
  "duelingkeeps",
  "elder",
  "electrichead",
  "electrocution",
  "eviscerated",
  "evolution",
  "eyetoeye",
  "falloutbunker",
  "fatalinstinct",
  "finnegans",
  "fluorescent",
  "foolishlegacy",
  "furiousheights",
  "fuse",
  "futurecrossings",
  "gospelcrossings",
  "gothicrage",
  "grimdungeons",
  "hearth",
  "hektik",
  "hellsgate",
  "henhouse",
  "heroskeep",
  "hiddenfortress",
  "houseofdecay",
  "industrialrevolution",
  "infinity",
  "innersanctums",
  "intervention",
  "ironworks",
  "japanesecastles",
  "jumpwerkz",
  "leftbehind",
  "leviathan",
  "limbus",
  "longestyard",
  "lostparadise",
  "lostworld",
  "mcsarges",
  "midlifecrisis",
  "monastery",
  "namelessplace",
  "newcerberon",
  "overgrowth",
  "overkill",
  "overlord",
  "phrantic",
  "pillbox",
  "provinggrounds",
  "pulpfriction",
  "purgatory",
  "quarantine",
  "qzpractice1",
  "qzpractice2",
  "qztraining",
  "ragnarok",
  "railyard",
  "realmofsteelrats",
  "rebound",
  "refinery",
  "reflux",
  "repent",
  "retribution",
  "revolver",
  "satanic",
  "scornforge",
  "seamsandbolts",
  "servitude",
  "shakennotstirred",
  "shiningforces",
  "siberia",
  "silence",
  "sinister",
  "skyward",
  "smash",
  "solarium",
  "solid",
  "somewhatdamaged",
  "sorrow",
  "spacechamber",
  "spacectf",
  "spidercrossings",
  "spillway",
  "stonekeep",
  "stronghold",
  "terminalheights",
  "terminatria",
  "terminus",
  "theatreofpain",
  "thedukesgarden",
  "theedge",
  "theepicenter",
  "theoldendomain",
  "threestory",
  "thunderstruck",
  "tornado",
  "toxicity",
  "trinity",
  "troubledwaters",
  "useandabuse",
  "verticalvengeance",
  "vortexportal",
  "warehouse",
  "wargrounds",
  "wicked",
  "windowpain",
  "windsongkeep",
  "zen",
  "any"
];

var Location = React.createClass({
  render: function() {
    return (
      <td>
        <div className={"flag flag-" + this.props.geo.country.toLowerCase()}></div>
        <span>{this.props.geo.city}</span>
      </td>
    );
  }
});

var GameType = React.createClass({
  render: function() {
    try {
      var original_factory = GAMETYPES[this.props.server.gameinfo.g_gametype + 100*this.props.server.gameinfo.g_instagib];
      return <td>{original_factory}</td>;
    } catch(e) {
      console.error(e);
      console.log(this.props);
      return null;
    }

  }
});

var PlayerCount = React.createClass({
  render: function() {
    var d = [
      this.props.server.gameinfo.sv_maxclients, // ffa
      this.props.server.gameinfo.sv_maxclients, // duel
      this.props.server.gameinfo.sv_maxclients, // race
      this.props.server.gameinfo.teamsize*2,  // tdm
      this.props.server.gameinfo.teamsize*2, // ca
      this.props.server.gameinfo.teamsize*2, // ctf
      this.props.server.gameinfo.teamsize*2, // 1f
      0, // wut?
      this.props.server.gameinfo.teamsize*2, // har
      this.props.server.gameinfo.teamsize*2, // ft
      this.props.server.gameinfo.teamsize*2, // dom
      this.props.server.gameinfo.teamsize*2, // ad
      this.props.server.gameinfo.sv_maxclients, // rr
    ][this.props.server.gameinfo.g_gametype];
    if (d == 0) {
      d = this.props.server.gameinfo.sv_maxclients;
    }
    return <td>{this.props.server.gameinfo.players.length + "/" + d}</td>;
  }
});

var Server = React.createClass({
  render: function() {
    return (
      <tr>
        <Location geo={this.props.server.location} />
        <GameType server={this.props.server} />
        <td>{this.props.server.host_name}</td>
        <td>{this.props.server.gameinfo.mapname}</td>
        <PlayerCount server={this.props.server} />
        <td>{this.props.server.password ? <img src="/images/lock.png" /> : null}</td>
        <td><a href={"steam://connect/" + this.props.server.host_address} className="btn btn-primary btn-xs">connect</a></td>
      </tr>
    );
  }
});

var FilterItemBlock = React.createClass({
  COMBOBOX_ARG_NAMES: [
    "g_instagib",
    "g_gamestate",
    "private",
    "region"
  ],
  
  getInitialState: function() {
    var state = {
      country: "any",
      g_factory: "any",
      gametype: [],
      mapname: [],
      min_players: 0,
      tags: "any"
    };

    this.COMBOBOX_ARG_NAMES.forEach( arg_name => {
      state[ arg_name ] = "any";
    });
    return state;
  },

  onAnythingChanged: function() {
    var state = {};
    var self = this;

    this.COMBOBOX_ARG_NAMES.forEach( arg_name => {
      state[ arg_name ] = self.refs[ arg_name ].value;

      // is int?
      var int_value = parseInt(state[arg_name]);
      if (int_value == int_value && int_value.toString() == state[arg_name]) {
        state[ arg_name ] = int_value;
        return;
      }

      if (state[arg_name].toLowerCase() == "true") {
        state[arg_name] = true;
      } else if (state[arg_name].toLowerCase() == "false") {
        state[arg_name] = false;
      }
    });

    this.setState(state);
  },

  componentDidMount: function() {
    var gametype_token_input_values = [];
    Object.keys(GAMETYPES).forEach( gametype_id => {
      gametype_token_input_values.push({id: gametype_id, name: GAMETYPES[gametype_id]});
    });

    var map_token_input_values = [];
    MAPS.forEach( mapname => {
      map_token_input_values.push({id: mapname, name: mapname});
    });

    var token_input_options = {
      theme: "facebook",
      hintText: "",
      noResultsText: "",
      onAdd: function() {
        var is_keyword_any_exists;
        var are_other_keywords_exist;

        [is_keyword_any_exists, are_other_keywords_exist] = this.tokenInput("get").reduce( (sum, item) => {
          return [sum[0] || (item.id == "any"), sum[1] || (item.id != "any")];
        }, [false, false]);

        if (is_keyword_any_exists && are_other_keywords_exist) {
          this.tokenInput("remove", {id: "any"});
        }
      },
      preventDuplicates: true,
      resultsLimit: 5,
      searchingText: ""
    };

    $(this.refs.gametype).tokenInput(gametype_token_input_values,
      $.extend({
      }, token_input_options)
    );

    $(this.refs.mapname) .tokenInput(map_token_input_values,
      $.extend({
        allowFreeTagging: true
      }, token_input_options)
    );
  },

  render: function() {
    return (<div><table><tbody>
      <tr>
        <td>Region</td>
        <td><select ref="region" value={this.state.region} onChange={this.onAnythingChanged}>
          <option value="any">Any</option>
          <option value="eu">Europe</option>
          <option value="na">North America</option>
          <option value="sa">South America</option>
          <option value="oc">Oceania</option>
          <option value="as">Asia</option>
          <option value="af">Africa</option>
        </select></td>
      </tr>
      <tr>
        <td>Gametype</td>
        <td><input type="text" ref="gametype" /></td>
      </tr>
      <tr>
        <td>Arenas</td>
        <td><input type="text" ref="mapname" /></td>
      </tr>
      <tr>
        <td>Gamestate</td>
        <td><select ref="g_gamestate" value={this.state.g_gamestate} onChange={this.onAnythingChanged}>
          <option value="any">Any</option>
          <option value="PRE_GAME">Warmup</option>
          <option value="IN_PROGRESS">In progress</option>
        </select></td>
      </tr>
      <tr>
        <td>Public or private</td>
        <td><select ref="private" value={this.state.private} onChange={this.onAnythingChanged}>
          <option value="any">Any</option>
          <option value="false">Public only</option>
          <option value="true">Private only</option>
        </select></td>
      </tr>
    </tbody></table></div>)
  }
});

var FilterOptions = React.createClass({
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
      return <Server server={server} key={i} />;
    });

    return (<div>
      <FilterOptions acceptFilterCallback={this.acceptFilter} filterData={window.localStorage.filterData} />
      <table>
        <thead><tr>
          <th>Location</th>
          <th>Gametype</th>
          <th>Hostname</th>
          <th>Arena</th>
          <th>Players</th>
          <th></th>
          <th></th>
        </tr></thead>
        <tbody>{result}</tbody>
      </table>
    </div>);
  }
});

/*
ReactDOM.render(<ServerList />, document.getElementById('content'));
// */
ReactDOM.render(<FilterItemBlock />, document.getElementById('content'));
