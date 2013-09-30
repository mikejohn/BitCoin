global.config = require('../config/config.js');
var BS_NET = require('../net/bitStamp');
var BS_DB = require('../model/BITSTAMPM.js').BITSTAMPM;
var dateFormat = require('../component/dateFormat.js').format;
var EventProxy = require(global.config.NODE_PATH+'eventproxy');
var job = function () {
    //connect db
    var mysql = require(global.config.NODE_PATH+'mysql');
    var connection = mysql.createConnection(global.config.MYSQL_DB);
    connection.connect(function (err) {
        if(err) throw err;
    });
    console.log(info_json);
    var bitstamp = new BS_DB();
    bitstamp.high = info_json.high;
    bitstamp.last = info_json.last;
    bitstamp.timestamp = dateFormat(new Date(Number(info_json.timestamp+'000')),'mysqlDateTime');
    bitstamp.bid = info_json.bid;
    bitstamp.volume = info_json.volume;
    bitstamp.low = info_json.low;
    bitstamp.ask = info_json.ask;
    bitstamp.create(connection,function(err,result){
           connection.end();
    });
};
var ep = EventProxy.create('NET',job);
//net
var info_string,info_json;
BS_NET.run(function (err,result) {
    if(err) throw err;
    info_string = result.toString();
    info_json = JSON.parse(result);
    ep.emit('NET');
});


