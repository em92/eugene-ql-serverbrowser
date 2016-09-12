var fs = require('fs');
var dgram = require('dgram');
var _ = require('lodash');
var ipRegex = require('ip-port-regex');

var servers = [];
var SERVER_LIST_FILENAME = "servers.txt"

// thanks to Egor "Danmer" Kotlyarov
// https://github.com/Danmer

function getIP(data) {
  var a = data.slice(0, 1).readUInt8();
  var b = data.slice(1, 2).readUInt8();
  var c = data.slice(2, 3).readUInt8();
  var d = data.slice(3, 4).readUInt8();
  return (a + '.' + b + '.' + c + '.' + d);
}

function getPort(data) {
  return data.slice(4, 6).readUInt16BE();
}

function parseIps(data) {
  var res = [];
  data = data.slice(6);
  while (data.length) {
    res.push(getIP(data));
    data = data.slice(6);
  }
  return _.uniq(res);
}

function parseAddresses(data) {
  var res = [];
  var ip = '';
  var port = '';
  data = data.slice(6);
  while (data.length) {
    ip = getIP(data);
    port = getPort(data);
    res.push(ip + ":" + port);
    data = data.slice(6);
  }
  return res;
}

function requestServersInfo(socket, locationCode, startAddress) {
  if (!locationCode) {
    locationCode = 0xFF;
  }
  if (!startAddress) {
    startAddress = '0.0.0.0:0';
  }
  var start = new Buffer([0x31]);
  var location = new Buffer([locationCode]);
  var ipPort = new Buffer(startAddress);
  var filters = new Buffer('\\appid\\282440');
  var nullBuf = new Buffer([0x00]);
  var message = Buffer.concat([start, location, ipPort, nullBuf, filters, nullBuf]);
  socket.send(message, 0, message.length, 27011, 'hl2master.steampowered.com');
}

function query() {
  var socket = dgram.createSocket('udp4');
  var addresses = [];
  return new Promise((resolve, reject) => {
    try {
      socket.bind(1234, function() {
        socket.on('message', function(msg, rinfo) {
          var newAddresses = parseAddresses(msg);
          var lastAddress = _.last(newAddresses);
          addresses = addresses.concat(newAddresses);
          if (lastAddress === '0.0.0.0:0') {
            socket.close();
            addresses.splice(-1);
            if (addresses.length > 0) {
              fs.writeFileSync(SERVER_LIST_FILENAME, addresses.join("\n"));
              servers = addresses.slice(0); // slice(0) = cloning
            }
            resolve();
          } else {
            requestServersInfo(socket, 0xFF, lastAddress);
          }
        });
        requestServersInfo(socket);
      });
    } catch(e) {
      console.error(e);
      reject(e);
    }
  });
}

try {
  servers = fs.readFileSync(SERVER_LIST_FILENAME, {encoding: "utf8"}).split("\n").filter( line => {
    return ipRegex({exact: true}).test( line );
  });
} catch(e) {
  console.error("master error:", e)
}

module.exports.query = query;
Object.defineProperty(module.exports, "servers", {
  get: function() { return servers; }
});
