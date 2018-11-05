
//控制音乐播放的时间
(function ($, root) {
    var $body = $(document.body);
    var allSecond;
    var percent;//当前播放过的音乐片段时间占总时间的百分比
    var startTime;
    var frameId;
    //音乐时间
    function formatTime(time) {
        var minute = Math.floor(allSecond / 60);
        var second = allSecond - minute * 60;
        if(minute<10){
            minute="0"+minute;
        }
        if(second<10){
            second="0"+second;
        }
        var forTime = minute + ":" + second;
        return forTime;

    }
    function renderAllTime(song){
        allSecond=song.duration;
        var allTime=formatTime(allTime);
        $body.find(".all-time").html(allTime);
    }
    
    //音乐播放后  根据percent计算当前音乐播放过的时间
    function curTime(){
        var curTime=allSecond*percent;
        curTime=formatTime(curTime);
        $body.find(".cur-time").html(curTime);
    }

    //计算已播放音乐的百分比percent
    function percentCompute(){
        startTime=new Date().getTime();
        function frame(){
            var curTime=new Date().getTime();
            percent=lastPercent+(curTime-startTime)/duration*1000;
            //若还没播放完,继续更新当前时间 直到播放结束为止;
            if(percent<1){
                 frameId=requestAnimationFrame(frame);
            }else{
                //播放结束，自动开启下一首音乐播放
                cancelAnimationFrame(frameId);
                $scope.find(".next-btn").trigger("click");

            }
        }   
        
    }
    function lastPercentComput(){
        var stopTime = new Date().getTime();
        lastPercent = lastPercent + (stopTime - startTime) / (curDuration * 1000);
        cancelAnimationFrame(frameId);
    }
    root.songTime = songTime;



})(window.Zepto, window.player || (window.play = {}))