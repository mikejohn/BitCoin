var BITSTAMPM = function () {
    this.last;
    this.high;
    this.low;
    this.volume;
    this.bid;
    this.ask;
    this.timestamp;
};
BITSTAMPM.prototype = {
    constructor : BITSTAMPM,
    //CURD
    create : function (connection,callback) {
        callback = ( typeof(callback) === 'function') ? callback : null;
        connection.query('INSERT INTO `bitstamp` (`last`,`high`,`low`,`volume`,`bid`,`ask`,`time`) VALUES'+
            '(?,?,?,?,?,?,?)',
            [this.last,this.high,this.low,this.volume,this.bid,this.ask,this.timestamp],
            function (err,result) {
                //todo log
                callback(err,result);
            }
        );
    },
    query : function () {

    }
};
exports.BITSTAMPM = BITSTAMPM;
