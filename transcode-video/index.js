'use static';
 
var aws = require('aws-sdk');

var elasticTranscoder = new aws.ElasticTranscoder({
    region: 'us-east-1'
});
 
exports.handler = function(event, context, callback) {
    console.log('Welcome');
 
    //  버킷에 추가된 파일명: "my file.txt"
    //  키: "my+file.txt"
    var key = event.Records[0].s3.object.key;   // 키 = URL 인코딩된 파일명
    var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));
    var outputKey = sourceKey.split('.')[0];

    var params = {
        PipelineId: '1603775592375-1d7p2v',      // Elastic Transcoder의  파이프라인 ID
        Input: { Key: sourceKey },
        //  https://docs.aws.amazon.com/ko_kr/elastictranscoder/latest/developerguide/system-presets.html
        Outputs: [
            {   // 일반 1080p
                // Key: outputKey + '/' + outputKey + '-1080p' + '.mp4',
                Key: `${outputKey}/${outputKey}-1080p.mp4`,
                PresetId: '1351620000001-000001'
            }, 
            {   // 일반 720p
                Key: outputKey + '/' + outputKey + '-720p' + '.mp4',
                PresetId: '1351620000001-000010'
            }, 
            {   // 웹: Facebook, SmugMug, Vimeo, YouTube
                Key: outputKey + '/' + outputKey + '-web-720p' + '.mp4',
                PresetId: '1351620000001-100070'
            }
        ]
    };
    
    elasticTranscoder.createJob(params, function(err, res) {
        if (err) {
            callback(err);
        }
    });
};
