'use strict';

var AWS = require('aws-sdk');
var s3 = new AWS.S3();

exports.handler = function(event, context, callback){
    // 이벤트에서 해당하는 SNS 메시지를 추출
    var message = JSON.parse(event.Records[0].Sns.Message);
    // 
    var sourceBucket = message.Records[0].s3.bucket.name;
    // 이름에 포함되어있는 표시를 "공백"으로 표시
    var sourceKey = decodeURIComponent(message.Records[0].s3.object.key.replace(/\+/g, ' '));

    var params = {
        Bucket: sourceBucket,
        Key: sourceKey,
        // NACL 설정 / 공개적으로 접근할 수 있게 하는 것
        ACL: 'public-read'
    };

    s3.putObjectAcl(params, function(err, data){
        if (err) {
            callback(err);
        }
    });
};