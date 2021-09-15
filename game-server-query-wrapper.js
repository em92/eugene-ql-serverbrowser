var gamedig = require("gamedig");

var gsq = function(options, callback) {
  gamedig.query(options)
    .then(function(state) {
      if (state.players.every(p => !p.name)) {
        throw new Error("Missing all player names");
      }
      callback(Object.assign({query: options}, state));
    })
    .catch(function(error) {
      callback({query: options, error: error});
    });
};

var MAX_PARALLEL_QUERY_COUNT = 10;

var endpoint_to_gsq_param = function( server ) {
  var host = server.split(':')[0];
  var port = parseInt(server.split(':')[1]);
  return { type: "quakelive", host: host, port: port, requestRules: true };
};

var query = function(servers, callback) {
  
  if ( servers.length == 0 ) return;
  
  var index = 0;
  
  return new Promise((resolve, reject) => {
    
    var inner_callback = function(state) {
      var server = state.query.host + ":" + state.query.port.toString();
      callback(server, state);
      index++;
      
      if( servers[index] ) {
        gsq( endpoint_to_gsq_param ( servers[index] ), inner_callback );
      } else if (index == servers.length + Math.min( MAX_PARALLEL_QUERY_COUNT - 1, servers.length ) ) {
        resolve();
      }
    };
    
    for ( ; index<Math.min( MAX_PARALLEL_QUERY_COUNT, servers.length ); index++ ) {
      gsq( endpoint_to_gsq_param ( servers[index] ), inner_callback );
    }
      
  });
};

module.exports = query;
