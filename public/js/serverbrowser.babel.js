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
  112: 'InstaRR'
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
  "zen"
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
  "ZW"
];

var FILTERS = {
  "country":      "Country",
  "g_factory":    "Factory",
  "g_gamestate":  "Gamestate",
  "gametype":     "Gametype",
  "mapname":      "Map",
  "min_players":  "Min. players count",
  "private":      "Accessibility",
  "rating_min":   "Server rating (min)",
  "rating_max":   "Server rating (max)",
  "region":       "Region",
  "turbo":        "Aircontrol",
  "vampiric":     "Vampiric damage",
  "tags":         "Tags"
};

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
      this.props.server.gameinfo.teamsize, // ffa
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
      this.props.server.gameinfo.teamsize, // rr
    ][this.props.server.gameinfo.g_gametype];
    if (d == 0) {
      d = this.props.server.gameinfo.sv_maxclients;
    }
    return <td>{this.props.server.gameinfo.players.length + ( this.props.server.gameinfo.bots.length ? "+" + this.props.server.gameinfo.bots.length : "" ) + "/" + d}</td>;
  }
});

var ServerRank = React.createClass({
  render: function() {
    var server = this.props.server;
    if (server.is_rated == false || server.rank == -1)
      return <td><img src="/images/unrated.png" /></td>;

    if (typeof(server.rank) == "undefined" || server.gameinfo.players.length == 0)
      return <td></td>;

   return <td><img src={"/images/rank" + server.rank + ".png"} /></td>;
  }
});


var Server = React.createClass({
  renderScore: function() {
    if (this.props.server.gameinfo.g_gamestate == 'PRE_GAME') return;

    if (this.props.server.gameinfo.is_team_game) {
      return <span style={{"whiteSpace": "pre"}}>
        <span className="qc1">{this.props.server.gameinfo.g_redscore}</span>
        <span> : </span>
        <span className="qc4">{this.props.server.gameinfo.g_bluescore}</span>
      </span>
    } else if (this.props.server.gameinfo.g_gametype == 0 && this.props.server.gameinfo.players.length > 1) {
      return <span style={{"whiteSpace": "pre"}}>
        <span>{this.props.server.gameinfo.players[0].score}</span>
        <span> : </span>
        <span>{this.props.server.gameinfo.players[1].score}</span>
      </span>
    }
  },

  render: function() {
    var self = this;
    var data = this.props.server;
    return (
      <tr className="server-row" onClick={() => {self.props.showServerInfo(self.props.server)}}>
        <Location geo={this.props.server.location} />
        <GameType server={this.props.server} />
        <td>{this.props.server.host_name}</td>
        <td>{this.props.server.gameinfo.mapname}</td>
        <PlayerCount server={this.props.server} />
        <td>{this.renderScore()}</td>
        <td>{data.gameinfo.g_gamestate == 'PRE_GAME' &&
            !( data.gameinfo.g_gametype == 2 && data.tags.indexOf("minqlx") > -1 )? <img src="/images/warmup.png" /> : null}</td>
        <td>{this.props.server.password ? <img src="/images/lock.png" /> : null}</td>
        <td>{this.props.server.dedicated ? null : <img src="/images/home.png" />}</td>
        <ServerRank server={this.props.server} />
        <td><a href={"steam://connect/" + this.props.server.host_address} className="btn btn-primary btn-xs">connect</a></td>
      </tr>
    );
  }
});

var FilterItemTokenInputMixin = {

  getInitialState: function() {
    if (typeof(this.props.value) == "undefined")
      return {value: []};
    else
      return {value: this.props.value};
  },

  onAnythingChanged: function() {
    var value = $(this.refs.input).tokenInput("get").map( item => item.id );
    this.setState({value: value});
    this.props.setFilterValue(this.name, value);
  },

  componentDidMount: function() {
    var self = this;
    var token_input_options = {
      theme: "facebook",
      hintText: "",
      noResultsText: "",
      onAdd: this.onAnythingChanged,
      onDelete: this.onAnythingChanged,
      allowFreeTagging: this.allowFreeTagging,
      prePopulate: ( this.allowFreeTagging ?
        this.state.value.map( item => ({id: item, name: item}) ) :
        this.tokens.filter( token => {return self.state.value.indexOf(token.id) > -1})
      ),
      preventDuplicates: true,
      resultsLimit: 5,
      searchingText: ""
    };

    $(this.refs.input).tokenInput(this.tokens, token_input_options);
  },

  render: function() {
    return (<div className="filter-item">
      <div className="filter-item-left">{this.prompt}</div>
      <div className="filter-item-right">
        <input type="text" ref="input" />
      </div>
    </div>);
  }
};

var FilterItemGametype = React.createClass({

  mixins: [FilterItemTokenInputMixin],
  prompt: FILTERS["gametype"],
  tokens: Object.keys(GAMETYPES).map( gametype_id => ({id: parseInt(gametype_id), name: GAMETYPES[gametype_id]}) ),
  name: "gametype"

});

var FilterItemMapname = React.createClass({

  allowFreeTagging: true,
  mixins: [FilterItemTokenInputMixin],
  prompt: FILTERS["mapname"],
  tokens: MAPS.map( mapname => ({id: mapname, name: mapname}) ),
  name: "mapname"

});

var FilterItemCountry = React.createClass({

  mixins: [FilterItemTokenInputMixin],
  prompt: FILTERS["country"],
  tokens: COUNTRY_CODE_LIST.map( item => ({id: item, name: item}) ),
  name: "country"

});

var FilterItemTags = React.createClass({

  allowFreeTagging: true,
  mixins: [FilterItemTokenInputMixin],
  prompt: FILTERS["tags"],
  tokens: [],
  name: "tags"

});

var FilterItemFactory = React.createClass({

  allowFreeTagging: true,
  mixins: [FilterItemTokenInputMixin],
  prompt: FILTERS["g_factory"],
  tokens: [],
  name: "g_factory"

});

var FilterItemIntegerInputMixin = {

  getInitialState: function() {
    if (typeof(this.props.value) == "undefined")
      return {value: 0};
    else
      return {value: this.props.value};
  },

  onAnythingChanged: function(event) {
    var result = 0;
    if (event.target.value.trim() != '') {
      result = parseInt(event.target.value);
    }
    if (result != result) result = 0; // NaN -> 0
    if (result < 0) result *= -1;
    if (result > 9999) result = 9999;
    this.setState({value: result});
    this.props.setFilterValue(this.name, result);
  },

  render: function() {
    return (<div className="filter-item">
      <div className="filter-item-left">{this.prompt}</div>
      <div className="filter-item-right">
        <input type="text" ref="input" className="simple_text" value={this.state.value} onChange={this.onAnythingChanged} />
      </div>
    </div>);
  }

};

var FilterItemMinPlayersCount = React.createClass({

  prompt: FILTERS["min_players"],
  mixins: [FilterItemIntegerInputMixin],
  name: "min_players"

});

var FilterItemRatingMin = React.createClass({

  prompt: FILTERS["rating_min"],
  mixins: [FilterItemIntegerInputMixin],
  name: "rating_min"

});

var FilterItemRatingMax = React.createClass({

  prompt: FILTERS["rating_max"],
  mixins: [FilterItemIntegerInputMixin],
  name: "rating_max"

});

var FilterItemComboBoxMixin = {

  getInitialState: function() {
    if (typeof(this.props.value) == "undefined")
      return {value: "none"};
    else if (typeof(this.props.value) != "string")
      return {value: this.props.value.toString()};
    else
      return {value: this.props.value};
  },

  onAnythingChanged: function(event) {
    var value = event.target.value;

    var int_value = parseInt(value);
    if (int_value == int_value && int_value.toString() == value) {
      this.props.setFilterValue(this.name, int_value);
    } else if ( value.toLowerCase() == "true" ) {
      this.props.setFilterValue(this.name, true);
    } else if ( value.toLowerCase() == "false" ) {
      this.props.setFilterValue(this.name, false);
    } else {
      this.props.setFilterValue(this.name, value);
    }

    this.setState({value: value});
  },

  render: function() {
    var self = this;
    var option_blocks = Object.keys(this.options).map( (name, i) => {
      return <option value={name} key={i+1}>{self.options[ name ]}</option>
    });

    return (<div className="filter-item">
      <div className="filter-item-left">{this.prompt}</div>
      <div className="filter-item-right">
        <select className="form-control input-sm" value={this.state.value} onChange={this.onAnythingChanged}>
          <option value="none" disabled="true" key={0}></option>
          {option_blocks}
        </select>
      </div>
    </div>);
  }

};

var FilterItemRegion = React.createClass({

  prompt: FILTERS["region"],
  mixins: [FilterItemComboBoxMixin],
  options: {
    "eu": "Europe",
    "eux": "Europe (with Ural and Siberia)",
    "na": "North America",
    "sa": "South America",
    "oc": "Oceania",
    "as": "Asia",
    "asx": "Asia (without Ural and Siberia)",
    "af": "Africa"
  },
  name: "region"

});

var FilterItemGamestate = React.createClass({

  prompt: FILTERS["g_gamestate"],
  mixins: [FilterItemComboBoxMixin],
  options: {
    "PRE_GAME": "Warmup",
    "IN_PROGRESS": "In progress"
  },
  name: "g_gamestate"

});

var FilterItemPrivate = React.createClass({

  prompt: FILTERS["private"],
  mixins: [FilterItemComboBoxMixin],
  options: {
    "false": "Public",
    "true": "Private"
  },
  name: "private"

});

var FilterItemVampiric = React.createClass({

  prompt: FILTERS["vampiric"],
  mixins: [FilterItemComboBoxMixin],
  options: {
    "false": "No",
    "true": "Yes"
  },
  name: "vampiric"

});

var FilterItemTurbo = React.createClass({

  prompt: FILTERS["turbo"],
  mixins: [FilterItemComboBoxMixin],
  options: {
    "false": "No",
    "true": "Yes"
  },
  name: "turbo"

});


var FilterBlock = React.createClass({

  getInitialState: function() {
    var id = this.props.id ? this.props.id : null;
    if (id == null) return {
      id: null,
      filter_data: {}
    };

    try {
      var filter_data = this.props.filterData;
      if (filter_data == null) filter_data = {};
      return {
        id: id,
        filter_data: filter_data
      };
    } catch(e) {
      return {
        id: id,
        filter_data: {}
      };
    }
  },

  setFilterValue: function(filter_name, filter_value) {
    var result = this.state.filter_data;
    result[ filter_name ] = filter_value;
    this.acceptFilterData( result );
  },

  removeFilterItem: function(filter_name) {
    var result = this.state.filter_data;
    delete result[ filter_name ];
    this.acceptFilterData( result );
  },

  acceptFilterData: function( result ) {
    this.setState( { filter_data: result } );
    this.props.parentCallback(this.props.id, result);
  },

  createFilterItem: function(event) {
    this.setFilterValue( event.target.value, [] );
  },

  render: function() {
    var self = this;

    var filter_options = [];
    Object.keys(FILTERS).forEach( (filter_name, i) => {
      if (typeof(self.state.filter_data[ filter_name ]) == "undefined") {
        filter_options.push(<option key={i+1} value={filter_name}>{FILTERS[filter_name]}</option>);
      }
    });

    var filter_items = Object.keys(this.state.filter_data).map( filter_name => {
      switch( filter_name ) {

        case "country":
          return {
            name: "country",
            body: <FilterItemCountry value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "g_factory":
          return {
            name: "g_factory",
            body: <FilterItemFactory value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "g_gamestate":
          return {
            name: "g_gamestate",
            body: <FilterItemGamestate value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "gametype":
          return {
            name: "gametype",
            body: <FilterItemGametype value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "mapname":
          return {
            name: "mapname",
            body: <FilterItemMapname value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "min_players":
          return {
            name: "min_players",
            body: <FilterItemMinPlayersCount value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "private":
          return {
            name: "private",
            body: <FilterItemPrivate value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "rating_min":
          return {
            name: "rating_min",
            body: <FilterItemRatingMin value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "rating_max":
          return {
            name: "rating_max",
            body: <FilterItemRatingMax value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "region":
          return {
            name: "region",
            body: <FilterItemRegion value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "tags":
          return {
            name: "tags",
            body: <FilterItemTags value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "turbo":
          return {
            name: "turbo",
            body: <FilterItemTurbo value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        case "vampiric":
          return {
            name: "vampiric",
            body: <FilterItemVampiric value={self.state.filter_data[ filter_name ]} setFilterValue={this.setFilterValue} />
          }

        default:
          console.error(filter_name);
          return null
      }
    });

    return (<div className="filter-block">
      {filter_items.map( (filter_item, i) => (
        <div className="filter-item-wrapper" key={i}>
          <div>{filter_item.body}</div>
          <div onClick={() => {this.removeFilterItem(filter_item.name)}} className="filter-item-close"></div>
        </div>
      ))}
      {filter_options.length == 0 ? null :
      <div className="filter-item">
        <div className="filter-item-left">Add filter:</div>
        <div className="filter-item-right"><select value="none" onChange={this.createFilterItem}>
          <option value="none" key={0} disabled={true}></option>
          {filter_options}
        </select></div>
      </div>
      }
    </div>);
  }
});

function get_clean_filter_data( filterData ) {
  return Object.keys( filterData ).map( i => {
    var state = $.extend({}, filterData[i]);
    if (state.tags) {
      state.tags = state.tags.join();
    }
    return state;
  });
}

function is_valid_filter_data_string( filterDataB ) {
  try {
    var data = JSON.parse( filterDataB );
    if ( Array.isArray(data) ) return false;
    if ( Object.keys(data).every( item => typeof(data[item]) == "object" && ( Array.isArray(data[item]) == false ) ) ) {
      return true;
    }
  } catch(e) {
  }
  return false;
}

function render_ql_nickname( nickname, classname ) {
  if ( nickname.length == 0 ) return null;

  var another_classname = classname;
  var start_index = ['0', '1', '2', '3', '4', '5', '6', '7'].reduce(function(result_index, current) {
    var current_index = nickname.indexOf("^" + current);
    if (current_index == -1 ) return result_index;
    if (current_index < result_index) {
      result_index = current_index;
      another_classname = "qc" + current;
    }
    return result_index;
  }, nickname.length);

  var part1 = nickname.substr(0, start_index);
  var part2 = nickname.substr(start_index+2);

  return (<span className={classname}>{part1}
    {render_ql_nickname(part2, another_classname)}
  </span>);
}

var FilterOptions = React.createClass({
  getInitialState: function() {
    return {
      filterData: this.props.filterData,
      filterDataB: JSON.stringify(this.props.filterData, null, 2), // B = Beautified
      filterDataBisValid: true,
      showingRawFilterData: false,
      hidden: true
    };
  },

  onFilterItemBlockChange: function(id, state) {
    var filterData = this.state.filterData;
    filterData[ id ] = state;
    this.setFilterData( filterData );
  },

  onAddFilterClick: function() {
    var id = (new Date().getTime() + Math.random()).toString();
    var filterData = this.state.filterData;
    filterData[ id ] = {};
    this.setState({filterData: filterData, hidden: false});
  },

  onRemoveFilterClickHandler: function(id) {
    var self = this;
    return function() {
      var filterData = self.state.filterData;
      delete filterData[ id ];
      self.setFilterData( filterData );
      self.setState({});
    }
  },

  setFilterData: function( filterData ) {
    window.localStorage.setItem( "filterDataB", JSON.stringify( filterData ) );
    var filterDataRaw = get_clean_filter_data( filterData );
    this.props.acceptFilterCallback( {"_": filterDataRaw } );
  },

  onShowHideOptionsClick: function() {
    this.setState({hidden: !this.state.hidden});
  },

  importFilterData: function() {
    var filterDataNew = JSON.parse( this.state.filterDataB );
    this.setFilterData( filterDataNew );
    this.setState({
      filterData: filterDataNew,
      showingRawFilterData: false
    });
  },

  showCommonFilter: function() {
    this.setState({showingRawFilterData: false});
  },

  onTextFilterChange: function( event ) {
    this.setState({
      filterDataB:        event.target.value,
      filterDataBisValid: is_valid_filter_data_string( event.target.value )
    });
  },

  exportFilterData: function() {
    this.setState({
      filterDataB: JSON.stringify(this.state.filterData, null, 2),
      filterDataBisValid: true,
      showingRawFilterData: true
    });
  },

  render: function() {

    var self = this;
    if (this.state.showingRawFilterData) {

      return (<div>
        <div className="filter-controls">
          {this.state.filterDataBisValid ? <a onClick={this.importFilterData} className="btn btn-primary btn-xs">Import</a> : <a className="btn btn-danger btn-xs">Bad filter</a> }
          <a onClick={this.showCommonFilter} className="btn btn-primary btn-xs">Done</a>
        </div>
        <div><textarea value={this.state.filterDataB} rows={this.state.filterDataB.split("\n").length-1} onChange={this.onTextFilterChange} /></div>
      </div>);
    }
    
    var filter_ids = Object.keys(this.state.filterData);
    filter_ids.sort();
    var render_result = filter_ids.map( filter_id => {
      return (<div className="filter-block-wrapper" key={filter_id} style={{display: this.state.hidden ? "none" : "block"}}>
        <FilterBlock
          id={filter_id}
          parentCallback={self.onFilterItemBlockChange}
          filterData={this.state.filterData[filter_id]}
          key={filter_id}
        />
        <div onClick={this.onRemoveFilterClickHandler(filter_id)} className="filter-block-close"></div>
      </div>)
    });
    var filter_cnt = render_result.length;
    if (render_result.length == 0) {
      render_result = <div className="no-filters">No filters defined. Press &quot;Add filter&quot; to add one</div>;
    }
    var filter_controls = (<div className="filter-controls">
      <a onClick={this.onShowHideOptionsClick} className="btn btn-primary btn-xs">{this.state.hidden ? "Show" : "Hide"} filters ({filter_cnt})</a>
      <a onClick={this.onAddFilterClick} className="btn btn-primary btn-xs">Add filter</a>
      <a onClick={this.exportFilterData} className="btn btn-primary btn-xs">Export</a>
    </div>);
    return (<div>
      {filter_controls}
      <div>{render_result}</div>
      {this.state.hidden || filter_cnt == 0 ? null : filter_controls}
    </div>);
  }
});

var ServerInfo = React.createClass({
  getInitialState: function() {
    return { server: null, is_showing_tags: false };
  },

  show: function( server ) {
    if (server.qlstats) {
      this.setState({server: server, loading: false});
    } else {
      this.setState({server: server, loading: true});
      this.downloadQLStatsData( server );
    }
  },

  hide: function() {
    this.setState({server: null, is_showing_tags: false});
  },

  showTags: function() {
    this.setState({is_showing_tags: true});
  },

  hideTags: function() {
    this.setState({is_showing_tags: false});
  },

  downloadQLStatsData: function( server ) {
    if (server == null) return;

    if (server.gameinfo.players.length == 0) {
      var server_updated = $.extend( {qlstats: {ok: true, players: []}}, server );
      this.setState({
        server: server_updated,
        loading: false
      });
      return;
    };

    $.ajax({
      url: "/qlstats/" + server.host_address,
      dataType: 'json',
      cache: true,
      success: (function (data) {
        var server_updated = $.extend( {qlstats: data}, server );
        this.props.updateServerDetails( server_updated );
        this.setState({
          server: server_updated,
          loading: false
        });
      }).bind(this),
      error: (function (xhr, status, err) {
        this.setState({
          loading: false
        });
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },

  getServer: function() {
    return this.state.server;
  },

  renderRaceData: function( ) {
    var players = this.state.server.gameinfo.players;

    var render_data = players.map( player => {
      return (<tr>
        <td>{render_ql_nickname(player.name)}</td>
      </tr>);
    });
    return (<table>
      <thead><tr>
        <th>Nick</th>
      </tr></thead>
      <tbody>{render_data}</tbody>
    </table>);
  },

  renderCommonData: function( ) {
    var players = this.state.server.gameinfo.players;

    players = players.concat(this.state.server.gameinfo.bots.map( function(p) {
      return {
        "score": p.score,
        "name": p.name
      };
    }));

    players.sort( function(a, b) {
      return b.score - a.score;
    });

    var render_data = players.map( player => {
      return (<tr>
        <td>{render_ql_nickname(player.name)}</td>
        <td>{player.score}</td>
      </tr>);
    });
    return (<table>
      <thead><tr>
        <th>Nick</th>
        <th style={{width: "50px"}}>Score</th>
      </tr></thead>
      <tbody>{render_data}</tbody>
    </table>);
  },

  renderQLStatsData: function( ) {
    var teams = ["Play", "Red", "Blue", "Spec", "Bot"];
    var team_class = ['qc2', 'qc1', 'qc4', 'qc7', 'qc2'];
    var players = this.state.server.qlstats.players;

    players = players.filter( function(p) {
      return p.steamid != "0";
    });

    players = players.concat(this.state.server.gameinfo.bots.map( function(p) {
      return {
        "team": 4,
        "score": p.score,
        "name": p.name
      };
    }));

    players.sort( function(a, b) {
      if (b.team > a.team) return -1;
      if (b.team < a.team) return 1;
      return b.score - a.score;
    });

    if ( players.length == 0 ) return (<div className="emptyserver">empty server</div>);

    var render_data = players.map( player => {
      return (<tr>
        <td><span className={team_class[player.team]}>{teams[player.team]}</span></td>
        <td>{ player.steamid ? <a target="_blank" href={'http://qlstats.net/player/' + player.steamid}>{render_ql_nickname(player.name)}</a> : render_ql_nickname(player.name) }</td>
        <td>{player.team != 3 ? player.score : null}</td>
        <td>{player.rating}</td>
      </tr>);
    });
    return (<table>
      <thead><tr>
        <th style={{width: "55px"}}>Team</th>
        <th>Nick</th>
        <th style={{width: "20px"}}>Score</th>
        <th style={{width: "50px"}}>Glicko</th>
      </tr></thead>
      <tbody>{render_data}</tbody>
    </table>);
  },

  renderData: function() {
    if (this.state.server.gameinfo.players.length == 0) return (<div className="emptyserver">empty server</div>);
    if (this.state.server.gameinfo.g_gametype == 2) return this.renderRaceData();
    return this.state.server.qlstats.ok ? this.renderQLStatsData() : this.renderCommonData();
  },

  renderScore: function() {
    // must have players
    if (this.state.server.gameinfo.players.length == 0) return null;

    // showing team scores only for team-based gametypes (RR - is not team-based)
    if (this.state.server.gameinfo.is_team_game == false) return null;

    // not showing scores on warmup
    if (this.state.server.gameinfo.g_gamestate == "PRE_GAME") return null;

    return (<li>
      Score: &nbsp;
        <span className="qc1">{this.state.server.gameinfo.g_redscore}</span>
        &nbsp; &ndash; &nbsp;
        <span className="qc4">{this.state.server.gameinfo.g_bluescore}</span>
    </li>);
  },

  render: function() {
    if (this.state.server == null) return null;
    return (<div className="serverinfo">
      <ul>
        <li>Gametype: {GAMETYPES[this.state.server.gameinfo.g_gametype + 100*this.state.server.gameinfo.g_instagib]}</li>
        <li>Gamestate: {{'PRE_GAME': 'Warmup', 'IN_PROGRESS': 'In progress'}[this.state.server.gameinfo.g_gamestate]}</li>
        <li>Map: {this.state.server.gameinfo.mapname}</li>
        <li>Address: {this.state.server.host_address}</li>
        {this.renderScore()}
      </ul>
      <div style={{"width": "100%", "textAlign": "center"}}>
        <a href={"steam://connect/" + this.state.server.host_address} className="btn btn-primary btn-xs">connect</a>
        &nbsp;
        <a onClick={this.state.is_showing_tags ? this.hideTags : this.showTags} className="btn btn-primary btn-xs">{this.state.is_showing_tags ? "hide tags" : "show tags"}</a>
        &nbsp;
        <a onClick={this.hide} className="btn btn-primary btn-xs">close</a>
      </div>
      { this.state.is_showing_tags ? 
        <p>
          {this.state.server.tags.map( tag => {
            return <span>{tag}&nbsp;</span>;
          })}
        </p>
        : null
      }
      {this.state.loading ? <div style={{"textAlign": "center"}}><img src="/images/loading.gif" /></div> : this.renderData()}
    </div>);
  }
});

var ServerList = React.createClass({
  getInitialState: function() {
    return { servers: [], error: false, loading: true, sleeping: true };
  },

  acceptFilter: function(filterDataIn) {
    filterDataIn = JSON.stringify(filterDataIn);
    this.filterData = "/" + window.btoa(filterDataIn);
    this.downloadServerList();
  },

  showServerDetails: function( server ) {
    this.refs.serverinfo.show( server );
  },

  hideServerDetails: function() {
    this.refs.serverinfo.hide();
  },

  updateServerDetails: function( server_updated ) {
    this.setState({servers: this.state.servers.map( server => {
      if (server.host_address == server_updated.host_address) {
        return server_updated;
      } else {
        return server;
      }
    })});
  },

  dataUpdateStart: function() {
    this.stopSleepTimer();
    if (this.state.sleeping == false) return;
    this.setState({sleeping: false, loading: true});
    this.downloadServerList();
    this.dataUpdateTimer = setInterval(this.downloadServerList, 10000);
  },

  dataUpdateStop: function() {
    this.setState({sleeping: true, loading: false});
    clearInterval(this.dataUpdateTimer);
  },

  downloadServerList: function() {
    $.ajax({
      url: "serverlist" + this.filterData,
      dataType: 'json',
      cache: true,
      success: (function (data) {
        this.setState( {servers: data.servers ? data.servers : [], loading: false, error: data.error } );

        var selected_server = this.refs.serverinfo.getServer();
        if (selected_server == null) return;

        var is_server_in_list = data.servers.some( server => {
          if (server.host_address == selected_server.host_address) {
            this.showServerDetails( server );
            return true;
          }
          return false;
        });
        if (is_server_in_list == false) this.hideServerDetails();
      }).bind(this),
      error: (function (xhr, status, err) {
        this.setState( {loading: false, error: "Failed to load server list" } );
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },

  startSleepTimer: function() {
    var self = this;
    this.sleepTimer = setTimeout(() => {
      self.dataUpdateStop();
    }, 60000);
  },

  stopSleepTimer: function() {
    clearTimeout(this.sleepTimer);
  },

  componentDidMount: function() {
    // don't do anything, if filterData is not defined
    if (!this.props.filterData) return;

    if ( typeof(this.props.filterData) == "object" ) {
      this.filterData = JSON.stringify( get_clean_filter_data( this.props.filterData ) );
    } else {
      this.filterData = this.props.filterData;
    }

    this.filterData = "/" + window.btoa(this.filterData);

    this.dataUpdateStart();

    addEventListener("blur",  this.startSleepTimer, false);
    addEventListener("focus", this.dataUpdateStart, false);
  },

  render: function() {
    var self = this;
    var state = this.state;
    var result = state.servers.map(function (server, i) {
      return <Server server={server} key={i} showServerInfo={self.showServerDetails} />;
    });

    if (this.state.error)
      result = (<div className="error">{this.state.error}</div>);
    else if (this.state.loading)
      result = (<div className="no-servers">Loading...</div>);
    else if (this.state.sleeping)
      result = (<div className="no-servers">Zzzzzz...</div>);
    else if (result.length != 0)
      result = (<table>
        <thead><tr>
          <th>Location</th>
          <th>Gametype</th>
          <th>Hostname</th>
          <th>Arena</th>
          <th>Players</th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr></thead>
        <tbody>{result}</tbody>
      </table>);
    else
      result = (<div className="no-servers">No results</div>);

    return (<div>
      <FilterOptions filterData={this.props.filterData} acceptFilterCallback={this.acceptFilter} />
      {result}
      <ServerInfo ref="serverinfo" updateServerDetails={this.updateServerDetails} />
    </div>);
  }
});

var SteamAccountBlock = React.createClass({

  getInitialState: function() {
    return { loading: true, error: false };
  },

  downloadAccountInfo: function() {
    $.ajax({
      url: "get_settings",
      dataType: 'json',
      success: (function (data) {
        this.props.getSettingsCallback(data);
        this.setState($.extend({loading: false}, data));
      }).bind(this),
      error: (function (xhr, status, err) {
        this.props.getSettingsCallback({error: err});
        this.setState({
          error: err,
          loading: false
        });
        console.error(xhr, status, err);
      }).bind(this)
    });
  },

  saveSettings: function() {
    this.setState({settings_saving_progress: "Saving..."});
    var self = this;
    $.ajax({
      url: "save_settings",
      method: "POST",
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: window.localStorage['filterDataB'],
      success: (function (data) {
        this.setState({settings_saving_progress: "Saved"});
        setTimeout( function() {
          self.setState({settings_saving_progress: false})
        }, 3000);
      }).bind(this),
      error: (function (xhr, status, err) {
        this.props.getSettingsCallback({error: err});
        this.setState({
          error: err,
          loading: false
        });
        this.setState({settings_saving_progress: "Error"});
        console.error(xhr, status, err);
      }).bind(this)
    });
  },

  componentDidMount: function() {
    this.downloadAccountInfo();
  },

  onPromoteClick: function() {
    this.setState({promoting_progress: "Promoting..."});
    var self = this;
    $.ajax({
      url: "promote",
      method: "POST",
      data: "dummy",
      success: function (data) {
        self.setState({promoting_progress: data.message});
        setTimeout( function() {
          self.setState({promoting_progress: false})
        }, 3000);
      },
      error: (function (xhr, status, err) {
        this.props.getSettingsCallback({error: err});
        this.setState({
          error: err,
          loading: false
        });
        this.setState({promoting_progress: "Error"});
        console.error(xhr, status, err);
      }).bind(this)
    });
  },

  render: function() {
    if (this.state.loading)
      return <div id="steam_account_block">Loading...</div>

    if (this.state.steam_id == "0")
      return <a id="steam_signin" href="/auth/steam">
        <img src="https://steamcommunity-a.akamaihd.net/public/images/signinthroughsteam/sits_01.png" />
      </a>

    return <div id="steam_account_block">
      <img src={this.state.avatar} />

      <div className="right_block_wrapper">
        <div className="hello">Hello, {render_ql_nickname(this.state.name)}!</div>
        <div className="cntrl">
          { this.state.settings_saving_progress ? <span>{this.state.settings_saving_progress}</span> : <a href="javascript:void(0)" onClick={this.saveSettings}>Save settings</a> }
          <span> | </span>
          { this.state.promoting_progress ? <span>{this.state.promoting_progress}</span> : <a href="javascript:void(0)" onClick={this.onPromoteClick}>Promote joined server</a> }
          <span> | </span>
          <a href="/logout">Logout</a></div>
      </div>
    </div>;
  }

});

var App = React.createClass({

  getInitialState: function() {
    return { loading: true, error: false };
  },

  getSettingsCallback: function(data) {
    if (data.error)
      this.setState({
        error: data.error,
        loading: false
      });
    else {
      var default_filter_data = {"0default": {"gametype": ['any']} };
      var filterDataB = window.localStorage['filterDataB'];
      if ( is_valid_filter_data_string( filterDataB ) ) {
        default_filter_data = JSON.parse( filterDataB );
      }

      this.setState({
        filterData: data.settings ? data.settings : default_filter_data,
        steamId: data.steam_id,
        loading: false
      });
    }
  },

  render: function() {
    if (this.state.error) {
      console.error(this.state.error);
      return null;
    }

    return (<div>
      <SteamAccountBlock getSettingsCallback={this.getSettingsCallback} />
      { this.state.loading ? null : <ServerList filterData={this.state.filterData} />} }
    </div>);
  }

});

ReactDOM.render(<App />, document.getElementById('content'));
