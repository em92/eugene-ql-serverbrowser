var redis = require("redis");

var rp_error_handler = function(error) {
  if (error.name == 'RequestError') {
    console.error(error.name, error.options.uri, error.message);
    return;
  } else if (error.name == 'StatusCodeError') {
    console.error(error.name, error.options.uri, error.statusCode);
    return;
  }
  throw error;
}

var redis_client = redis.createClient({
  url: process.env.npm_package_config_redis_url,
  retry_strategy: function (options) {

    if (options.error && options.error.code) {
      console.error("redis", options.error.code);
    } else {
      console.error("redis", options.error);
    }

    // reconnect in 3 seconds
    return 3000;
  }
});


module.exports.rp_error_handler = rp_error_handler;
module.exports.redis = redis_client;
