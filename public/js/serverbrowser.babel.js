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
  "gametype": "Gametype"
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
      prePopulate: this.tokens.filter( token => {
        return self.state.value.indexOf(token.id) > -1
      }),
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

var FilterBlock = React.createClass({

  filter_items: [],

  getInitialState: function() {
    return {}
  },

  createFilterItem: function(filter_name) {
    if (typeof(filter_name) == "string") {
      // pass
    } else if (typeof(filter_name) == "object") {
      filter_name = filter_name.target.value;
    } else {
      console.error("createFilterItem", filter_name, typeof(filter_name));
    }
    switch(filter_name) {
      case 'gametype':
        this.filter_items.push({
          name: "gametype",
          body: <FilterItemGametype setFilterValue={this.setFilterValue}/>
        });
        this.setState({gametype: []});
      break;

      default:
        return;
    }
  },

  setFilterValue: function(filter_name, filter_value) {
    var result = {}
    result[ filter_name ] = filter_value;
    this.setState( result );
  },

  removeFilterItem: function(filter_name) {
    var result = this.state;
    delete result[ filter_name ];
    this.filter_items = this.filter_items.filter( item => item.name != filter_name );
    this.setState( result );
  },

  componentWillMount: function() {
    this.createFilterItem("gametype");
  },

  render: function() {
    var filter_options = [];
    var self = this;
    Object.keys(FILTERS).forEach( (filter_name, i) => {
      if (typeof(self.state[ filter_name ]) == "undefined") {
        filter_options.push(<option key={i+1} value={filter_name}>{FILTERS[filter_name]}</option>);
      }
    });

    return (<div className="filter-block">
      {this.filter_items.map( (filter_item, i) => (
        <div className="filter-item-wrapper" key={i}>
          <div>{filter_item.body}</div>
          <a onClick={() => {this.removeFilterItem(filter_item.name)}} className="close">&times;</a>
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

/*
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
      g_gamestate: "any",
      g_factory: ["any"],
      gametype: ["any"],
      mapname: ["any"],
      min_players: 0,
      private: "any",
      region: "any",
      tags: ["any"]
    };

    Object.keys(state).forEach( arg_name => {
      if (typeof(this.props.options[ arg_name ]) != "undefined") {
        state[arg_name] = this.props.options[ arg_name ];
      }
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

    this.setState(state);
    this.props.parentCallback(this.props.id, $.extend(this.state, state));
  },

  onMinimumPlayersCountChanged: function(event) {
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
      onDelete: function() {
        if (this.tokenInput("get").length == 0) {
          this.tokenInput("add", {id: "any", name: "any"});
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
            Tags: <br /><input type="text" ref="tags" />
          </div>
          <div className="filter-block-cell">
            Arenas: <br /><input type="text" ref="mapname" />
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
*/

var FilterOptions = React.createClass({
  getInitialState: function() {
    var filterData = window.localStorage.getItem('filterData2');
    filterData = filterData == null ? {} : JSON.parse(filterData);
    return {
      filterData: filterData,
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
    }
  },

  setFilterData: function( filterData ) {
    if (filterData.constructor.name != 'Object') {
      filterData = this.state.filterData;
    } else {
      this.setState({filterData: filterData});
    }
    window.localStorage.setItem('filterData2', JSON.stringify(filterData));
    var filterDataRaw = Object.keys( filterData ).map( i => {
      var state = $.extend({}, filterData[i]);
      state["_"] = state.gametype.map( item => {
        if (item == "any") return {g_gametype: "any"};
        if (item >= 100) return {g_gametype: item-100, g_instagib: 1};
        else return {g_gametype: item, g_instagib: 0};
      });
      delete state.gametype;
      return state;
    });
    this.props.acceptFilterCallback( {"_": filterDataRaw } );
  },

  onShowHideOptionsClick: function() {
    this.setState({hidden: !this.state.hidden});
  },

  render: function() {

    var self = this;
    var render_result = Object.keys(this.state.filterData).map( (filter_id, i) => {
      return (<div className="filter-block-wrapper" key={i} style={{display: this.state.hidden ? "none" : "block"}}>
        <FilterItemBlock 
          id={filter_id}
          options={self.state.filterData[filter_id]}
          parentCallback={self.onFilterItemBlockChange}
        />
        <a onClick={this.onRemoveFilterClickHandler(filter_id)} className="close">&times;</a>
      </div>)
    });
    var filter_cnt = render_result.length;
    if (render_result.length == 0) {
      render_result = <div className="no-filters">No filters defined. Press &quot;Add filter&quot; to add one</div>;
    }
    var filter_controls = (<div className="filter-controls">
      <a onClick={this.onShowHideOptionsClick} className="btn btn-primary btn-xs">{this.state.hidden ? "Show" : "Hide"} filters ({filter_cnt})</a>
      <a onClick={this.onAddFilterClick} className="btn btn-primary btn-xs">Add filter</a>
      <a onClick={this.setFilterData} className="btn btn-primary btn-xs">Apply</a>
    </div>);
    return (<div>
      {filter_controls}
      <div>{render_result}</div>
      {this.state.hidden || filter_cnt == 0 ? null : filter_controls}
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

  downloadServerList: function() {
    $.ajax({
      url: "serverlist" + this.filterData,
      dataType: 'json',
      cache: true,
      success: (function (data) {
        this.setState( {servers: data.servers, loading: false, error: false } );
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
    var state = this.state;
    var result = state.servers.map(function (server, i) {
      return <Server server={server} key={i} />;
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
        </tr></thead>
        <tbody>{result}</tbody>
      </table>);
    else
      result = (<div className="no-servers">No results</div>);

    return (<div>
      <FilterOptions acceptFilterCallback={this.acceptFilter} />
      {result}
    </div>);
  }
});

ReactDOM.render(<FilterBlock />, document.getElementById('content')); /*
ReactDOM.render(<ServerList />, document.getElementById('content'));
// */
