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
  "rating_min":   "Rating (min)",
  "rating_max":   "Rating (max)",
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
    var self = this;
    return (
      <tr>
        <Location geo={this.props.server.location} />
        <GameType server={this.props.server} />
        <td>{this.props.server.host_name}</td>
        <td>{this.props.server.gameinfo.mapname}</td>
        <PlayerCount server={this.props.server} />
        <td>{this.props.server.password ? <img src="/images/lock.png" /> : null}</td>
        <td>{this.props.server.dedicated ? null : <img src="/images/home.png" />}</td>
        <td><a onClick={() => {self.props.showServerInfo(self.props.server)}} className="btn btn-primary btn-xs">details</a></td>
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
    "na": "North America",
    "sa": "South America",
    "oc": "Oceania",
    "as": "Asia",
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
      var filter_data = JSON.parse(window.localStorage.getItem('filterData_' + id));
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
    window.localStorage.setItem('filterData_' + this.state.id, JSON.stringify(this.state.filter_data));
    this.setState( { filter_data: result } );
    this.props.parentCallback(this.state.id, result);
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

var FilterOptions = React.createClass({
  getInitialState: function() {
    var filterData = {};
    for (var i=0; i<window.localStorage.length; i++) {
      var key = window.localStorage.key(i);
      var id = key.substr(11);
      if ( key.substr(0, 11) == 'filterData_' && id != "" ) {
        try {
          filterData[ id ] = JSON.parse( window.localStorage.getItem( key ) );
        } catch(e) {
          console.error(key, e);
        }
      }
    }
    return {
      filterData: filterData,
      filterDataB: JSON.stringify(filterData, null, 2), // B = Beautified
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
      window.localStorage.removeItem("filterData_" + id);
      self.setFilterData( filterData );
      self.setState({});
    }
  },

  setFilterData: function( filterData ) {
    var filterDataRaw = Object.keys( filterData ).map( i => {
      var state = $.extend({}, filterData[i]);
      if (state.tags) {
        state.tags = state.tags.join();
      }
      return state;
    });
    this.props.acceptFilterCallback( {"_": filterDataRaw } );
  },

  onShowHideOptionsClick: function() {
    this.setState({hidden: !this.state.hidden});
  },

  importFilterData: function() {
    for (var i=0; i<window.localStorage.length; i++) {
      var key = window.localStorage.key(i);
      if ( key.substr(0, 11) == 'filterData_' ) {
        window.localStorage.removeItem( key );
      }
    }
    var filterDataNew = JSON.parse( this.state.filterDataB );
    console.log(filterDataNew);
    Object.keys( filterDataNew ).forEach( filter_id => {
      window.localStorage.setItem("filterData_" + filter_id, JSON.stringify( filterDataNew[ filter_id ] ));
    });
    this.setFilterData( filterDataNew );
    this.setState( this.getInitialState() );
  },

  showCommonFilter: function() {
    this.setState({showingRawFilterData: false});
  },

  onTextFilterChange: function( event ) {
    var filterDataBisValid = true;
    try {
      var temp = JSON.parse(event.target.value);
      filterDataBisValid = Object.keys(temp).every( item => typeof(temp[item]) == "object" && ( Array.isArray(temp[item]) == false ) );
    } catch(e) {
      console.error(e);
      filterDataBisValid = false;
    }
    this.setState({
      filterDataB:        event.target.value,
      filterDataBisValid: filterDataBisValid
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
    return { server: null };
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
    this.setState({server: null});
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

  renderQLNickname: function(nickname) {
    nickname = ['0', '1', '2', '3', '4', '5', '6', '7'].reduce(function(sum, current) {
      return sum.split("^" + current).join('</span><span class="qc' + current + '">');
    }, nickname);
    return '<span class="qc7">' + nickname + '</span>';
  },

  renderCommonData: function( ) {
    var players = this.state.server.gameinfo.players;
    players.sort( function(a, b) {
      if (b.score > a.score) return 1;
      if (b.score < a.score) return -1;
    });

    var render_data = players.map( player => {
      return (<tr>
        <td dangerouslySetInnerHTML={{__html: this.renderQLNickname(player.name)}}></td>
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
    var teams = ["Play", "Red", "Blue", "Spec"];
    var team_class = ['qc2', 'qc1', 'qc4', 'qc7'];
    var players = this.state.server.qlstats.players;
    players.sort( function(a, b) {
      if (b.team > a.team) return -1;
      if (b.team < a.team) return 1;
      if (b.score > a.score) return 1;
      if (b.score < a.score) return -1;
      return 0;
    });

    var render_data = players.map( player => {
      return (<tr>
        <td><span className={team_class[player.team]}>{teams[player.team]}</span></td>
        <td><a target="_blank" href={'http://qlstats.net/player/' + player.steamid}><span dangerouslySetInnerHTML={{__html: this.renderQLNickname(player.name)}}></span></a></td>
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
    return this.state.server.qlstats.ok ? this.renderQLStatsData() : this.renderCommonData();
  },

  render: function() {
    if (this.state.server == null) return null;
    return (<div className="serverinfo">
      <ul>
        <li>Gametype: {GAMETYPES[this.state.server.gameinfo.g_gametype + 100*this.state.server.gameinfo.g_instagib]}</li>
        <li>Gamestate: {{'PRE_GAME': 'Warmup', 'IN_PROGRESS': 'In progress'}[this.state.server.gameinfo.g_gamestate]}</li>
        <li>Map: {this.state.server.gameinfo.mapname}</li>
      </ul>
      <div style={{"width": "100%", "text-align": "center"}}>
        <a href={"steam://connect/" + this.state.server.host_address} className="btn btn-primary btn-xs">connect</a>
        &nbsp;
        <a onClick={this.hide} className="btn btn-primary btn-xs">close</a>
      </div>
      {this.state.loading ? <img src="/images/loading.gif" /> : this.renderData()}
    </div>);
  }
});

var ServerList = React.createClass({
  getInitialState: function() {
    return { servers: [], error: false };
  },

  acceptFilter: function(filterDataIn) {
    filterDataIn = JSON.stringify(filterDataIn);
    window.localStorage.setItem('filterData', filterDataIn);
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

  downloadServerList: function() {
    $.ajax({
      url: "serverlist" + this.filterData,
      dataType: 'json',
      cache: true,
      success: (function (data) {
        this.setState( {servers: data.servers, loading: false, error: false } );

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

  componentDidMount: function() {
    this.filterData = window.localStorage.filterData ? "/" + window.btoa(window.localStorage.filterData) : "";
    this.downloadServerList();
    setInterval(this.downloadServerList, 10000);
  },

  render: function() {
    var self = this;
    var state = this.state;
    var result = state.servers.map(function (server, i) {
      return <Server server={server} key={i} showServerInfo={self.showServerDetails} />;
    });

    if (this.state.error)
      result = (<div className="error">{this.state.error}</div>);
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
        </tr></thead>
        <tbody>{result}</tbody>
      </table>);
    else
      result = (<div className="no-servers">No results</div>);

    return (<div>
      <FilterOptions acceptFilterCallback={this.acceptFilter} />
      {result}
      <ServerInfo ref="serverinfo" updateServerDetails={this.updateServerDetails} />
    </div>);
  }
});

ReactDOM.render(<ServerList />, document.getElementById('content'));
