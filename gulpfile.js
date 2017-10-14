/**
 * Created by majiangtao on 2017/9/21.
 */
var gulp = require('gulp');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
var browserSync = require('browser-sync');

gulp.task('default',['watch'], function () {
    console.log('默认任务');
});

//创建less编译任务,编译后压缩css
gulp.task('less', function () {
    gulp.src('public/less/*.less')
        .pipe(less())
        .pipe(cssmin())
        .pipe(gulp.dest('build/css'));
});
//创建自动编译任务
gulp.task('browserSync', function () {
    browserSync({
        server:{
            baseDir:'build' //告知根目录
        }
    });
});

var reload = browserSync.reload;
gulp.task('watch',['less','browserSync'], function () {
    //添加监听事件
    gulp.watch('public/less/*.less',['less']);

    //根目录下任何变化涮新页面
    gulp.watch('build/**/*.*').on('change',reload);
});