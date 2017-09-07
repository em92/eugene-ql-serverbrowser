var servers = {};
var PROMOTION_TIMEOUT = 300;

var current_timestamp = function() {
  return Math.floor( Date.now() / 1000 );
}


var promote = function( endpoint ) {
  var ct = current_timestamp();
  if ( ( servers[endpoint] || 0 ) + PROMOTION_TIMEOUT < ct ) {
    servers[endpoint] = ct + PROMOTION_TIMEOUT;
    return true;
  }

  return false;
}


var demote = function( endpoints ) {
  if (typeof(endpoints) == "string") {
    endpoints = [endpoints];
  }

  endpoints.forEach( endpoint => {
    delete servers[endpoint];
  });
}


var is_promoted = function( endpoint ) {
  if (!servers[endpoint]) return 0;
  if (servers[endpoint] + PROMOTION_TIMEOUT < current_timestamp()) {
    demote(endpoint);
    return 0;
  }
  return servers[endpoint];
}


module.exports = {
  promote: promote,
  demote: demote,
  is_promoted: is_promoted
}
