var dns = require('dns');

var promisified_resolve4 = function( hostname ) {
  return new Promise( (resolve, reject) => {
    dns.resolve4( hostname, (error, result) => {
      if (error)
        resolve( null );
      else
        resolve( result[0] );
    });
  });
}

var lookup = function( endpoints ) {

  var extract_hostname = endpoint => endpoint.split(":")[0].toLowerCase().trim();
  var hosts_to_resolve = Array.from( new Set(
    endpoints.map( endpoint => extract_hostname( endpoint ) )
  ));

  var host2ip = {};

  return Promise.all( Array.from(hosts_to_resolve).map( domain => promisified_resolve4( domain ) ) )
  .then( resolved_ips => {
    resolved_ips.forEach( ( ip, i ) => {
      if (ip == null) return;
      host2ip[ hosts_to_resolve[i] ] = ip;
    });

    return endpoints.map( endpoint => {
      var host = extract_hostname( endpoint );
      if (host2ip[ host ]) {
        var ip = host2ip[ host ];
        return ip + endpoint.substr( host.length );
      } else {
        return endpoint;
      }
    });
  })
  .catch( error => {
    console.trace(error);
    console.error(error);
    return endpoints;
  });
};

module.exports.lookup = lookup;
