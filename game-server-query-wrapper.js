var gsq = require("game-server-query");

var MAX_PARALLEL_QUERY_COUNT = 10;

var endpoint_to_gsq_param = function( server ) {
  var host = server.split(':')[0];
  var port = parseInt(server.split(':')[1]);
  return { type: "synergy", host: host, port: port };
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
