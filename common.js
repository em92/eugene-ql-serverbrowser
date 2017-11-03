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

module.exports.rp_error_handler = rp_error_handler;
