(function($,root){
    function audioControl(){
        this.audio=new Audio();//生成音频对象
        this.status='pause';
    }
    audioControl.prototype={
        play:function(){
            this.audio.play();//h5音频的播放事件
            this.status="play";
        },
        pause:function(){
            this.audio.pause();
            this.status="pause";
        },
        getAudio:function(src){
            //设置音频路径
            this.audio.src=src;
            this.audio.load();
        },
        //拖拽播放
        playTo:function(currTime){
            // this.audio.load();
            this.audio.currentTime=currTime;
            this.play();
        }

    }
    root.audioControl=audioControl;

})(window.Zepto,window.player||(window.player={}))