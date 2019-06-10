export const GAMETYPES = {
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
};

export function isValidFilterDataString(filterDataB) {
  try {
    var data = JSON.parse( filterDataB );
    if ( Array.isArray(data) ) return false;
    if ( Object.keys(data).every( item => typeof(data[item]) == "object" && ( Array.isArray(data[item]) == false ) ) ) {
      return true;
    }
  } catch(e) {
  }
  return false;
};

export let FILTER_ITEM_PROMPTS = {
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
