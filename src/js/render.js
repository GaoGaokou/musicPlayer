//实现音乐数据返回后渲染到页面中
//将$对象传给内部立即执行函数，使其可以使用zepto.js中的方法对象
//通过window.player暴露函数
(function($,root){
    var $body=$(document.body);
     //创建歌曲信息
    function renderInfo(info){
        var songInfo= '<div class="song-name">'+info.song+'</div>'+
       '<div class="singer-name">'+info.singer+'</div>'+
       '<div class="album-name">'+info.album+'</div>';
       $body.find(".song-info").html(songInfo);
    }

    //创建歌曲图片信息
    function renderImg(src){  
        var img=new Image();
        img.onload=function(){
            root.blurImg(img,$body);
            $body.find(".song-img img").attr("src",src); 
        }
        img.src=src;
    }

    //歌曲是否是喜欢 来添加图片
    function renderIsLike(isLike){
        if(isLike){
            $body.find(".like-btn").addClass("liking");
        }else{
            $body.find(".like-btn").removeClass("liking");

        }
    }
    
    root.render=function(song){
        renderImg(song.image);
        renderInfo(song);
        renderIsLike(song.isLike);
    };//将函数引用暴露给root（player）对象的render
    
})(window.Zepto,window.player||(window.player={}))