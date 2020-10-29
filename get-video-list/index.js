'use strict';

var AWS = require('aws-sdk');
var async = require('async');

var s3 = new AWS.S3();

// S3 listObjects 함수에 대한 구성을 만듬
// 입력 포맷을 생성
// Json 데이터 반환
function createBucketParams(next) {
    var params = {
        Bucket: process.env.BUCKET,
        EncodingType: 'url'
    };
    // callback 함수 이름 지정
    next(null, params);
}


// S3 SDK를 사용해 지정된 버킷에서 객체 목록을 가져온다.
// 버킷의 데이터 목록을 조회
function getVideosFromBucket(params, next){
    // params에서 객체를 반환 해주는 함수가 arg2
    s3.listObjects(params, function(err, data) {
        if(err) {
            next(err);
        } else{
            next(null, data);
        }
    });
}


// 조회 결과를 반환할 포맷으로 변형
function createList(data, next) {
    console.log(data);
    
    var urls = [];
    for (var i = 0; i < data.Contents.length; i++) {
        var file = data.Contents[i];
        // substr : JavaScript 내장 함수
        if (file.Key && file.Key.substr(-3, 3) === 'mp4') {
            urls.push(file);
        }
    }

    var result = {
        baseUrl: process.env.BASE_URL,
        bucket: process.env.BUCKET,
        urls: urls
    }
    next(null, result);
}


// call 함수 define
exports.hander = function(event, context, callback) {
    // 순차적인 함수의 배열, 최종 함수
    async.waterfall([
        createBucketParams,
        getVideosFromBucket,
        createList
    ], function(err, result) {
        if (err) {
            // 람다함수가 호출된 곳으로 오류를 반환
            callback(err);
        } else {
            callback(null, result);
        }
    });
};