var options = {
    hostname: 'www.bitstamp.net',
    path: '/api/ticker/',
    port: 443,
    method: 'GET'
};
exports.run = function (cb) {
    callback = (typeof(cb) === 'function')?cb:null;
    var https = require('https');
    var req = https.request(options,function (res) {
        var data = new Buffer(0);
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            var chunkBuff = new Buffer(chunk);
            var list = [data, chunkBuff];
            data = Buffer.concat(list);
        });
        res.on('end', function () {
            callback(null,data);
        });
    });
    req.on('error', function (err) {
       callback(err);
    });
    req.end();
};
