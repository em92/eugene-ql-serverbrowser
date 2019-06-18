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

var redis_client = null;
if (process.env.REDIS_URL) {
  redis_client = redis.createClient({
    url: process.env.REDIS_URL,
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
} else {
  console.error("WARNING: environment variable REDIS_URL is not set. Any data stored to session will be lost after restart!")

  // fake redis client
  redis_client = {
    fake: true,
    data: {},
    get: function(key, done) {
      done(null, this.data[key]);
    },
    set: function(key, value, done) {
      this.data[key] = value;
      done(null, value);
    }
  }
}

var get_current_timestamp = function() {
  return Math.round(new Date().getTime()/1000);
};

module.exports.rp_error_handler = rp_error_handler;
module.exports.redis = redis_client;
module.exports.get_current_timestamp = get_current_timestamp;
