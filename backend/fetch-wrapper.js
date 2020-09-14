const baseFetch = require("node-fetch");
const timeoutSignal = require("timeout-signal");

async function fetch(url, options) {
  return await baseFetch(url, Object.assign({signal: timeoutSignal(5000)}, options));
}

module.exports = fetch;
