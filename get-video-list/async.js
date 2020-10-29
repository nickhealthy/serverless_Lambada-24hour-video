var async = require("async");

async.waterfall([
    function(callback) {
        console.log(`첫번쨰 함수`);
        callback(null, "Peter", "Sam");
    },
    function(a1, a2, callback) {
        console.log(`두번째 함수 ${a1}, ${a2}`);
        callback(null, "Serverless");
    },
    function(a3, callback) {
        console.log(`세번째 함수 ${a3}`);
        callback(null, "Done");
    },
    ], function(err, result) {
        console.log(`최종 콜백 ${err}, ${result}`);
    });