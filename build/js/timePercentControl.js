!function(n,t){var i,a,r=n(document.body),o=0,c=0;function m(n){n=Math.round(n);var t=Math.floor(n/60),e=n-60*t;return t<10&&(t="0"+t),e<10&&(e="0"+e),t+":"+e}function l(n){var t=i*n;t=m(t),r.find(".cur-time").html(t);var e=100*(n-1)+"%";r.find(".pro-top").css({transform:"translateX("+e+")"})}t.timePercentControl={renderAllTime:function(n){var t=m(i=n.duration);r.find(".all-time").html(t)},start:function(){o=(new Date).getTime(),cancelAnimationFrame(a),function n(){var t=(new Date).getTime(),e=c+(t-o)/(1e3*i);l(e),e<1?a=requestAnimationFrame(n):(cancelAnimationFrame(a),r.find(".next-btn").trigger("click"))}()},stop:function(){var n=(new Date).getTime();c+=(n-o)/(1e3*i),cancelAnimationFrame(a)},curTime:l}}(window.Zepto,window.player||(window.play={}));