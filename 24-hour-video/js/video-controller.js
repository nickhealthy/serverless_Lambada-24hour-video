var videoController = {
    data: {
        config: null
    },
    uiElements: {
        videoCardTemplate: null,
        videoList: null
    },
    // 초기화
    init: function(config) {
        this.uiElements.videoCardTemplate = $('#video-template');
        this.uiElements.videoList = $('#video-list');

        this.data.config = config;

        this.getVideoList();
        this.wireEvents();
    },
    // 함수 선언
    getVideoList: function() {
        var that = this;

        var url = this.data.config.getFileListApiUrl + '/videos';
        $.get(url, function(data, status) {
            that.updateVideoFrontPage(data);
        });
    },
    updateVideoFrontPage: function(data) {
        var baseUrl = data.domain;
        var bucket = data.bucket;

        for (var i = 0; i < data.urls.length; i++) {
            var video = data.urls[i];
            var clone = this.uiElements.videoCardTemplate
            .clone()
            .attr("id", "video-", + i);
            clone
            .find("source")
            .attr("src", `https://${bucket}.s3.amazonaws.com/${video.Key}`)
            .attr("display", "inline");
            this.uiElements.videoList.prepend(clone);
            
        }
    },
        // console.log(data);
        // for(var i = 0; i < data.urls.length; i++) {
        //     var video = data.urls[i];
        //     console.log(video.Key);
        //     console.log(data.baseUrl + "/" + video.Key);
        //     $('#video-list').append(`<li>${data.baseUrl}/${video.Key}</li>`);
        // }
    
    wireEvents: function() {
        $('#video-list').on('click', 'li', function() {
            console.log($(this).text());
            $('source').attr('src', $(this).text());
            $('video').load();
        });
    }
};