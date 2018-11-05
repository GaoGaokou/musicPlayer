//下载gulp  npm install gulp --save-dev
var gulp = require('gulp');
var imagemin = require("gulp-imagemin");//引入图片压缩插件
var htmlmin = require("gulp-htmlclean");
var jsmin = require("gulp-uglify");
var stripDeb = require("gulp-strip-debug");//清除console.log;debuggle断句调试
var concat = require("gulp-concat");//多个js文件相连接成一个文件，减少http请求访问次数
var less = require("gulp-less");
var postcss = require("gulp-postcss");//解析css3
var autoprefixer = require("autoprefixer");//为css3属性自动添加前缀
var cssnano = require("cssnano");//压缩css
var connect=require("gulp-connect");//开启本地服务器
//命令行执行 开发者环境
//export NODE_ENV=development

var devMode = process.env.NODE_ENV == "development";
// console.log(devMode);

// gulp.src();//读文件
// gulp.dest();//写文件
// gulp.task();//创建任务
// gulp.watch();//监听
var folder = {
    src: "./src/",
    build: "./build/",
}
gulp.task("image", function () {//任务的执行
    //任务的读取
    //把读取到的文件变成文件流形式
    //再把文件流变成源文件格式 输出到build文件中
    var page = gulp.src(folder.src + 'image/*')
    .pipe(connect.reload())//实现自动刷新，，每当文件改变的时候
    if (!devMode) {//区分是什么开发环境，若是开发环境就不压缩
        page.pipe(imagemin())//压缩
    }
    page.pipe(gulp.dest(folder.build + "image/"))
    //执行 gulp images
    //下载插件
    //npm install gulp-imagemin --save-dev
    //gulp images

})
//打包html文件到buld中
//html依赖images,所以先解析images在解析html
gulp.task("html", function () {
    var page = gulp.src(folder.src + "html/*")
    .pipe(connect.reload())
    if (!devMode) {
        page.pipe(htmlmin())
    }
    page.pipe(gulp.dest(folder.build + "html/"))
})
//执行 gulp html
//打包html文件
gulp.task("js", function () {
    var page = gulp.src(folder.src + "js/*")
    .pipe(connect.reload())
    // .pipe(concat("main.js"))//合并
    if (!devMode) {
        page.pipe(jsmin())//压缩
        .pipe(stripDeb())
    }
    page.pipe(gulp.dest(folder.build + "js/"))

})


//打包css文件
gulp.task("css", function () {
    var options = [autoprefixer(), cssnano()];
    var page = gulp.src(folder.src + "css/*")
    .pipe(connect.reload())
        .pipe(less())
    if (!devMode) {
        page.pipe(postcss(options))
    }
    //解析并且压缩css3属性，并且自动添加浏览器兼容属性
    page.pipe(gulp.dest(folder.build + "css/"));
})

//监听：不用每次gulp打包
gulp.task('watch', function () {
    //监听源文件，并在输出文件中进行处理
    gulp.watch(folder.src + "html/*", ["html"]);
    gulp.watch(folder.src + "css/*", ["css"]);
    gulp.watch(folder.src + "js/*", ["js"]);
    gulp.watch(folder.src + "image/*", ["image"]);
})

//创建服务
gulp.task("server",function(){
    connect.server({
        port:8090,//修改端口号
        livereload:true,//开启重加载功能实现浏览器自动刷新
    });
})
//访问服务：浏览器输入 http://localhost:8080

//默认执行该任务
gulp.task("default", ["html", "image", "js", "css", "watch","server"], function () {
    console.log(1);
})