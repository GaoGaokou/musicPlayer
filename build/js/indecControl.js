(function($,root){
    //获取当前歌曲的index值
    //创建构造函数
    //index,len属性
    //通过构造函数new出来的对象都有prev/next方法
    function controlIndex(len){
        this.index=index;
        this.len=len;
    }
    controlIndex.prototype={
        prev:function(){
            // index--;
            return this.getIndex(-1);
        },
        next:function(){
            // index++;
            return this.getIndex(1);
        },
        //根据当前没被点击之前的index和前后点击操作计算出点击后的index值
        getIndex:function(val){
            var index=this.index;
            var len=this.len;
            var curIndex=(index+len+val)%len;
            this.index=curIndex;
            return curIndex;
        }
    }
    root.controlIndex=controlIndex;//暴露接口 在index.js中引用

})(window.Zepto,window.player||(window.play={}))