var os = require('os');

var interfaces = os.networkInterfaces();
var addresses = [];
console.log(interfaces)
for (var k in interfaces) {
    console.log(k)
    for (var k2 in interfaces[k]) {
        var address = interfaces[k][k2];
        console.log(address)
        if (address.family === 'IPv4' && !address.internal) {
            addresses.push(address.address);
        }
    }
}

console.log(addresses);
var ip = require('ip');

console.log(ip.address());