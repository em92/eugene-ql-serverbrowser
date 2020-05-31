var fs = require("fs");
var fetch = require("node-fetch");
var extend = require("util")._extend;

var log4js = require('log4js');
var logger = log4js.getLogger(__filename.slice(__dirname.length + 1, -3));
logger.level = "debug";

var c2c = {"BD": "AS", "BE": "EU", "BF": "AF", "BG": "EU", "BA": "EU", "BB": "NA", "WF": "OC", "BL": "NA", "BM": "NA", "BN": "AS", "BO": "SA", "BH": "AS", "BI": "AF", "BJ": "AF", "BT": "AS", "JM": "NA", "BV": "AN", "BW": "AF", "WS": "OC", "BR": "SA", "BS": "NA", "JE": "EU", "BY": "EU", "BZ": "NA", "RU": "EU", "RW": "AF", "RS": "EU", "TL": "AS", "RE": "AF", "TM": "AS", "TJ": "AS", "RO": "EU", "TK": "OC", "GW": "AF", "GU": "OC", "GT": "NA", "GS": "AN", "GR": "EU", "GQ": "AF", "GP": "NA", "JP": "AS", "GY": "SA", "GG": "EU", "GF": "SA", "GE": "AS", "GD": "NA", "GB": "EU", "GA": "AF", "SV": "NA", "GN": "AF", "GM": "AF", "GL": "NA", "GI": "EU", "GH": "AF", "OM": "AS", "TN": "AF", "JO": "AS", "HR": "EU", "HT": "NA", "HU": "EU", "HK": "AS", "HN": "NA", "HM": "AN", "VE": "SA", "PR": "NA", "PS": "AS", "PW": "OC", "PT": "EU", "SJ": "EU", "PY": "SA", "IQ": "AS", "PA": "NA", "PF": "OC", "PG": "OC", "PE": "SA", "PK": "AS", "PH": "AS", "PN": "OC", "PL": "EU", "PM": "NA", "ZM": "AF", "EH": "AF", "EE": "EU", "EG": "AF", "ZA": "AF", "EC": "SA", "IT": "EU", "VN": "AS", "SB": "OC", "EU": "EU", "ET": "AF", "SO": "AF", "ZW": "AF", "SA": "AS", "ES": "EU", "ER": "AF", "ME": "EU", "MD": "EU", "MG": "AF", "MF": "NA", "MA": "AF", "MC": "EU", "UZ": "AS", "MM": "AS", "ML": "AF", "MO": "AS", "MN": "AS", "MH": "OC", "MK": "EU", "MU": "AF", "MT": "EU", "MW": "AF", "MV": "AS", "MQ": "NA", "MP": "OC", "MS": "NA", "MR": "AF", "IM": "EU", "UG": "AF", "TZ": "AF", "MY": "AS", "MX": "NA", "IL": "AS", "FR": "EU", "IO": "AS", "FX": "EU", "SH": "AF", "FI": "EU", "FJ": "OC", "FK": "SA", "FM": "OC", "FO": "EU", "NI": "NA", "NL": "EU", "NO": "EU", "NA": "AF", "VU": "OC", "NC": "OC", "NE": "AF", "NF": "OC", "NG": "AF", "NZ": "OC", "NP": "AS", "NR": "OC", "NU": "OC", "CK": "OC", "CI": "AF", "CH": "EU", "CO": "SA", "CN": "AS", "CM": "AF", "CL": "SA", "CC": "AS", "CA": "NA", "CG": "AF", "CF": "AF", "CD": "AF", "CZ": "EU", "CY": "AS", "CX": "AS", "CR": "NA", "CV": "AF", "CU": "NA", "SZ": "AF", "SY": "AS", "KG": "AS", "KE": "AF", "SR": "SA", "KI": "OC", "KH": "AS", "KN": "NA", "KM": "AF", "ST": "AF", "SK": "EU", "KR": "AS", "SI": "EU", "KP": "AS", "KW": "AS", "SN": "AF", "SM": "EU", "SL": "AF", "SC": "AF", "KZ": "AS", "KY": "NA", "SG": "AS", "SE": "EU", "SD": "AF", "DO": "NA", "DM": "NA", "DJ": "AF", "DK": "EU", "VG": "NA", "DE": "EU", "YE": "AS", "DZ": "AF", "US": "NA", "UY": "SA", "YT": "AF", "UM": "OC", "LB": "AS", "LC": "NA", "LA": "AS", "TV": "OC", "TW": "AS", "TT": "NA", "TR": "EU", "LK": "AS", "LI": "EU", "LV": "EU", "TO": "OC", "LT": "EU", "LU": "EU", "LR": "AF", "LS": "AF", "TH": "AS", "TF": "AN", "TG": "AF", "TD": "AF", "TC": "NA", "LY": "AF", "VA": "EU", "VC": "NA", "AE": "AS", "AD": "EU", "AG": "NA", "AF": "AS", "AI": "NA", "VI": "NA", "IS": "EU", "IR": "AS", "AM": "AS", "AL": "EU", "AO": "AF", "AN": "NA", "AQ": "AN", "AP": "AS", "AS": "OC", "AR": "SA", "AU": "OC", "AT": "EU", "AW": "NA", "IN": "AS", "AX": "EU", "AZ": "AS", "IE": "EU", "ID": "AS", "UA": "EU", "QA": "AS", "MZ": "AF"};
var cache = {};
var temp_cache = {};
var tasks = new Set();
var saveAsTemporary = new Set();

var URAL_SIBERIA_TIMEZONES = [
  "Asia/Yekaterinburg",
  "Asia/Omsk",
  "Asia/Novosibirsk",
  "Asia/Novokuznetsk",
  "Asia/Krasnoyarsk",
  "Asia/Irkutsk"
];
var TIMEOUT = 1000; // 1000 ms -> 60 request per minute

function getRegion(geo_data) {
  return geo_data.region ? geo_data.region : c2c[geo_data.country];
}


var lookup = function(ip, isPermanent) {
  if (typeof(isPermanent) == "undefined") isPermanent = false;

  if (typeof(cache[ip]) != "undefined")
    return extend( {region: getRegion( cache[ip] ) }, cache[ip] );

  if (typeof(temp_cache[ip]) != "undefined")
    return extend( {region: getRegion( temp_cache[ip] ) }, temp_cache[ip] );

  tasks.add(ip);
  if (!isPermanent) {
    saveAsTemporary(ip);
  }
  logger.debug("Added " + ip + " to tasks");
  throw new Error("n/a");
};


async function ready() {
  try {
    await _ready();
  } catch (error) {
    console.error("geoip: mainLoop error: " + error.message);
  }
}

async function _ready() {
  let ipsToLookup = Array.from(tasks);

  while (ipsToLookup.length > 0) {
    let response = await fetch("http://ip-api.com/batch?fields=city,countryCode,query", {
      method: "post",
      body: JSON.stringify(ipsToLookup.splice(0, 100)),
      headers: {"Content-Type": "application/json"}
    });

    let items = await response.json();

    items.forEach(item => {
      let geoData = {
        country: item.countryCode,
        city: item.city.split(" ("),
      };

      let isPermanent = !saveAsTemporary.has(item.query);

      if (geoData.country == "RU" && item.timezone.startsWith("Asia")) {
        geoData.region = (URAL_SIBERIA_TIMEZONES.indexOf(item.timezone ) > -1) ? "EA": "AS";
      }

      if (geoData.country == "DE" && geoData.city == "Frankfurt am Main") {
        geoData.city = "Frankfurt";
      }

      logger.debug("geoip: mainLoop data: " + item.query + " => " + geoData.city + (isPermanent ? "" : " (temporary)"));

      if (!isPermanent) {
        saveAsTemporary.delete(item.query);
        temp_cache[item.query] = geoData;
      } else {
        cache[item.query] = geoData;
        // TODO: save to DB asynchronously
        fs.writeFileSync("./geoip.json", JSON.stringify(cache, null, "  "));
      }

      tasks.delete(item.query);
    });
  }
}

try {
  cache = JSON.parse( fs.readFileSync("./geoip.json", {options: "utf-8"}) );
} catch(error) {
  console.error("geoip: startup error: " + error.message);
  cache = {};
}

module.exports.lookup = lookup;
module.exports.ready = ready;
