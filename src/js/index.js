var $ = window.Zepto;
var root = window.player;

//点击类
var $body = $(document.body);
var index = 0;
var songList;
//创建音频控制对象
var audioControl=new root.audioControl();
//获取所有的歌曲信息 传给点击函数 点击按钮根据当前数据索引来渲染页面

function bindEvent() {

    //自定义play:change事件 检测播放事件
    $body.on("play:change",function(event,index){
        audioControl.getAudio(songList[index].audio);//加载一个音频

        if(audioControl.status=="play"){
            audioControl.play();
            root.timePercentControl.start();

        }else{
            audioControl.pause();
        }
        //因为play:change是默认触发第一首音乐，之后每次play的status改变都会触发
        //所以可以把🈶状态改变的事件添加到这里
        root.render(songList[index]);
        //渲染第一个音乐以及之后的每一首
        root.timePercentControl.renderAllTime(songList[index]);
        //切歌 实现开始的时间为从0开始播放
        root.timePercentControl.curTime(0);
    }),
    $body.trigger("play:change",0);//自动触发 默认播放/渲染/时间渲染第一shou音乐



    //播放按钮
    $body.on("click",".play-btn",function(){
        
        if(audioControl.status=="play"){
            audioControl.pause();
            root.timePercentControl.stop();//暂停的时候取消时间获取
            // audioControl.status="pause";
        }else{
            audioControl.play();
            // audioControl.status="play";
            root.timePercentControl.start();
        }
        $(this).toggleClass("pause");
    }),
    
    //上一首
    $body.on("click", ".prev-btn", function () {

        // root.render(data[index]);//需要通过ajax请求来获得数据
        // 函数封装实现模块化
        // if (index == 0) {
        //     index = songList.length - 1;
        // } else {
        //     index--;
        // }
        index=controlIndex.prev();//获取相关音乐索引
        root.render(songList[index]);//渲染

        // audioControl.getAudio(songList[index].audio);//加载完音频路径后开始播放
        // audioControl.play();
        $body.trigger("play:change",index);


        

    })
    //下一首
    $body.on("click", ".next-btn", function () {
        // root.render(data[index]);//需要通过ajax请求来获得数据
        // if (index == songList.length - 1) {
        //     index = 0;
        // } else {
        //     index++;
        // }
         index=controlIndex.next();
        root.render(songList[index]);

        // audioControl.getAudio(songList[index].audio);//加载完音频路径后开始播放
        // audioControl.play();
        $body.trigger("play:change",index);

        
    })
    

}
//拖动事件
function bindTouch(){
    var $sliderPoint=$body.find(".slider-pointer");
    var $proWrapper=$body.find(".pro-wrapper");
    var percent=0;
    var offsetLeft=$proWrapper.offset().left;
    var width=parseInt($proWrapper.css("width"));
    console.log(width);
    //开始拖拽时候，音乐播放暂停
    $sliderPoint.on("touchstart",function(){
        root.timePercentControl.stop();
    });
    //开始拖拽时候，记录鼠标位置
    //让进度条拖动到鼠标位置
    //计算拖动位置所占总宽度的百分比
    //更新拖动到的时间
    $sliderPoint.on("touchmove",function(e){
        var x=e.changedTouches[0].clientX;
        percent=(x-offsetLeft)/width;
        if(percent<0||percent>1){
            percent=0;
        }
        root.timePercentControl.curTime(percent);
    })
    //让音乐从当前位置开始播放
    $sliderPoint.on("touchend",function(){
        allSecond=songList[controlIndex.index].duration;
        currTime=allSecond*percent;
        audioControl.playTo(currTime);
        // root.timePercentControl.start(percent);
        $body.find(".play-btn").toggleClass("");
    })
    

}
function getData(url) {
    //开启本地服务器访问音乐数据信息
    $.ajax({
        type: "GET",
        url: url,
        success: function (data) {
            songList = data;
            //将数据赋值给songList ，在bindEvent(）函数中使用方便在点击事件中渲染数据
            bindEvent();
            bindTouch();
            //创建索引控制对象
            controlIndex=new root.controlIndex(data.length);
            //请求数据的时候创建controlIndex对象获取当前数据的index和length值

            //获取时间
            // root.Time(data[0]);
        },
        error: function () {
            console.log("error");
        }
    })
}
getData("../mock/data.json");

