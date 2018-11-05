
//控制音乐播放的时间
(function ($, root) {
    var $body = $(document.body);
    var allSecond;
    // var nowPercent;//当前播放过的音乐片段时间占总时间的百分比
    var startTime=0;
    var lastPercent=0;
    var frameId;
    //音乐时间格式化
    function formatTime(time) {
        time=Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
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
        var allTime=formatTime(allSecond);
        $body.find(".all-time").html(allTime);
    }
    
    //渲染当前时间
    function curTime(nowPercent){
        var currTime=allSecond*nowPercent;
        currTime=formatTime(currTime);
        $body.find(".cur-time").html(currTime);

        //移动播放过的滚动条 调整线的translateX属性向右移动100%-->80%->0%移动
        var translateX=(nowPercent-1)*100+"%";
        $body.find(".pro-top").css({
            "transform":"translateX("+translateX+")",
        })

    }

    //计算当前音乐已经播放的百分比percent,实时计算更新当前音乐播放过的时间和进度条
    function nowPercentCompute(){
                // lastPercent = precentage === undefined ? lastPercent : precentage; 
         startTime=new Date().getTime();
        //获取新的时间
        cancelAnimationFrame(frameId);

        function frame(){
            var currTime=new Date().getTime();
            var nowPercent=lastPercent+(currTime-startTime)/(allSecond*1000);
            curTime(nowPercent);//渲染到页面中

            //若还没播放完,继续更新当前时间 直到播放结束为止;
            if(nowPercent<1){
                 frameId=requestAnimationFrame(frame);

            }else{
               // 播放结束，自动开启下一首音乐播放
                cancelAnimationFrame(frameId);
                $body.find(".next-btn").trigger("click");

            }
        }  
        frame(); 
        
    }
    //停止播放时进度条和时间就停止并记录当前的时间戳,
    //当再次播放时候从记录的时刻开始播放
    function stop(){
        var stopTime = new Date().getTime();
        lastPercent =lastPercent+(stopTime - startTime) / (allSecond * 1000);
        cancelAnimationFrame(frameId);
    }
    root.timePercentControl={
        renderAllTime:renderAllTime,
        start:nowPercentCompute,
        stop:stop,
        curTime:curTime,
    };



})(window.Zepto, window.player || (window.play = {}))