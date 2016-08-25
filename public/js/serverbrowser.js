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

var COUNTRY_CODE_LIST = [
  "AD",
  "AE",
  "AF",
  "AG",
  "AI",
  "AL",
  "AM",
  "AN",
  "AO",
  "AP",
  "AQ",
  "AR",
  "AS",
  "AT",
  "AU",
  "AW",
  "AX",
  "AZ",
  "BA",
  "BB",
  "BD",
  "BE",
  "BF",
  "BG",
  "BH",
  "BI",
  "BJ",
  "BL",
  "BM",
  "BN",
  "BO",
  "BR",
  "BS",
  "BT",
  "BV",
  "BW",
  "BY",
  "BZ",
  "CA",
  "CC",
  "CD",
  "CF",
  "CG",
  "CH",
  "CI",
  "CK",
  "CL",
  "CM",
  "CN",
  "CO",
  "CR",
  "CU",
  "CV",
  "CX",
  "CY",
  "CZ",
  "DE",
  "DJ",
  "DK",
  "DM",
  "DO",
  "DZ",
  "EC",
  "EE",
  "EG",
  "EH",
  "ER",
  "ES",
  "ET",
  "EU",
  "FI",
  "FJ",
  "FK",
  "FM",
  "FO",
  "FR",
  "FX",
  "GA",
  "GB",
  "GD",
  "GE",
  "GF",
  "GG",
  "GH",
  "GI",
  "GL",
  "GM",
  "GN",
  "GP",
  "GQ",
  "GR",
  "GS",
  "GT",
  "GU",
  "GW",
  "GY",
  "HK",
  "HM",
  "HN",
  "HR",
  "HT",
  "HU",
  "ID",
  "IE",
  "IL",
  "IM",
  "IN",
  "IO",
  "IQ",
  "IR",
  "IS",
  "IT",
  "JE",
  "JM",
  "JO",
  "JP",
  "KE",
  "KG",
  "KH",
  "KI",
  "KM",
  "KN",
  "KP",
  "KR",
  "KW",
  "KY",
  "KZ",
  "LA",
  "LB",
  "LC",
  "LI",
  "LK",
  "LR",
  "LS",
  "LT",
  "LU",
  "LV",
  "LY",
  "MA",
  "MC",
  "MD",
  "ME",
  "MF",
  "MG",
  "MH",
  "MK",
  "ML",
  "MM",
  "MN",
  "MO",
  "MP",
  "MQ",
  "MR",
  "MS",
  "MT",
  "MU",
  "MV",
  "MW",
  "MX",
  "MY",
  "MZ",
  "NA",
  "NC",
  "NE",
  "NF",
  "NG",
  "NI",
  "NL",
  "NO",
  "NP",
  "NR",
  "NU",
  "NZ",
  "OM",
  "PA",
  "PE",
  "PF",
  "PG",
  "PH",
  "PK",
  "PL",
  "PM",
  "PN",
  "PR",
  "PS",
  "PT",
  "PW",
  "PY",
  "QA",
  "RE",
  "RO",
  "RS",
  "RU",
  "RW",
  "SA",
  "SB",
  "SC",
  "SD",
  "SE",
  "SG",
  "SH",
  "SI",
  "SJ",
  "SK",
  "SL",
  "SM",
  "SN",
  "SO",
  "SR",
  "ST",
  "SV",
  "SY",
  "SZ",
  "TC",
  "TD",
  "TF",
  "TG",
  "TH",
  "TJ",
  "TK",
  "TL",
  "TM",
  "TN",
  "TO",
  "TR",
  "TT",
  "TV",
  "TW",
  "TZ",
  "UA",
  "UG",
  "UM",
  "US",
  "UY",
  "UZ",
  "VA",
  "VC",
  "VE",
  "VG",
  "VI",
  "VN",
  "VU",
  "WF",
  "WS",
  "YE",
  "YT",
  "ZA",
  "ZM",
  "ZW",
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
    "g_gamestate",
    "private",
    "region"
  ],

  TOKENINPUT_ARG_NAMES: [
    "country",
    "gametype",
    "g_factory",
    "mapname",
    "tags"
  ],

  getInitialState: function() {
    var state = {
      country: ["any"],
      g_factory: ["any"],
      gametype: ["any"],
      mapname: ["any"],
      min_players: 0,
      tags: ["any"]
    };

    this.COMBOBOX_ARG_NAMES.forEach( arg_name => {
      state[ arg_name ] = "any";
    });
    return state;
  },

  onAnythingChanged: function(state) {
    // forcing state to be Object
    if (state.constructor.name == 'SyntheticEvent') state = {};

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

    this.TOKENINPUT_ARG_NAMES.forEach( arg_name => {
      state[arg_name] = $(self.refs[ arg_name ]).tokenInput("get").map( obj => {
        var int_value = parseInt(obj.id);
        if (int_value == int_value && int_value.toString() == obj.id) {
          return int_value;
        } else {
          return obj.id;
        }
      });
    });

    console.log(state);
    this.setState(state);
  },

  onMinimumPlayersCountChanged: function(event) {
    console.log(event.constructor.name);
    var result = 0;
    if (event.target.value.trim() != '') {
      result = parseInt(event.target.value);
    }
    if (result != result) result = 0; // NaN -> 0
    if (result < 0) result *= -1;
    this.onAnythingChanged({ min_players: result });
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

    var country_token_input_values = [];
    COUNTRY_CODE_LIST.forEach( country_code => {
      country_token_input_values.push({id: country_code, name: country_code});
    });

    var self = this;
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

        self.onAnythingChanged({});
      },
      preventDuplicates: true,
      resultsLimit: 5,
      searchingText: ""
    };

    $(this.refs.country).tokenInput(country_token_input_values,
      $.extend({
        prePopulate: this.state.country.map( item => ({id: item, name: item}) )
      }, token_input_options)
    );

    $(this.refs.g_factory).tokenInput([],
      $.extend({
        prePopulate: this.state.g_factory.map( item => ({id: item, name: item}) ),  
        allowFreeTagging: true
      }, token_input_options)
    );

    $(this.refs.gametype).tokenInput(gametype_token_input_values,
      $.extend({
        prePopulate: this.state.gametype.map( item => ({id: item, name: GAMETYPES[item]}) )
      }, token_input_options)
    );

    $(this.refs.mapname).tokenInput(map_token_input_values,
      $.extend({
        prePopulate: this.state.mapname.map( item => ({id: item, name: item}) ),
        allowFreeTagging: true
      }, token_input_options)
    );

    $(this.refs.tags).tokenInput([],
      $.extend({
        prePopulate: this.state.g_factory.map( item => ({id: item, name: item}) ),
        allowFreeTagging: true
      }, token_input_options)
    );
  },

  render: function() {
    return (
      <div className="filter-block">
        <div className="filter-block-column filter-block-left-column">
          <div className="filter-block-cell">
            Gametype:<br /><input type="text" ref="gametype" />
          </div>
          <div className="filter-block-cell">
            Arenas: <br /><input type="text" ref="mapname" />
          </div>
          <div className="filter-block-cell">
            Tags: <br /><input type="text" ref="tags" />
          </div>
        </div>
        <div className="filter-block-column filter-block-center-column">
          <div className="filter-block-cell">
            Region:<br /><select ref="region" className="form-control input-sm" value={this.state.region} onChange={this.onAnythingChanged}>
              <option value="any">Any</option>
              <option value="eu">Europe</option>
              <option value="na">North America</option>
              <option value="sa">South America</option>
              <option value="oc">Oceania</option>
              <option value="as">Asia</option>
              <option value="af">Africa</option>
            </select>
          </div>
          <div className="filter-block-cell">
            Country:<br /><input type="text" ref="country" />
          </div>
          <div className="filter-block-cell">
            Factories: <br /><input type="text" ref="g_factory" />
          </div>
        </div>
        <div className="filter-block-column filter-block-right-column">
          <div className="filter-block-cell">
            Gamestate:<br /><select ref="g_gamestate" className="form-control input-sm" value={this.state.g_gamestate} onChange={this.onAnythingChanged}>
              <option value="any">Any</option>
              <option value="PRE_GAME">Warmup</option>
              <option value="IN_PROGRESS">In progress</option>
            </select>
          </div>
          <div className="filter-block-cell">
            Accessibility:<br /><select ref="private" className="form-control input-sm" value={this.state.private} onChange={this.onAnythingChanged}>
              <option value="any">Any</option>
              <option value="false">Public only</option>
              <option value="true">Private only</option>
            </select>
          </div>
          <div className="filter-block-cell">
            Minimum players count: <br /><input type="text" ref="min_players" className="simple_text" value={this.state.min_players} onChange={this.onMinimumPlayersCountChanged} />
          </div>
        </div>
      </div>
    );
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
      cache: true,
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
    setInterval(this.downloadServerList, 10000);
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

ReactDOM.render(<FilterItemBlock />, document.getElementById('content')); /*
ReactDOM.render(<ServerList />, document.getElementById('content'));
// */

