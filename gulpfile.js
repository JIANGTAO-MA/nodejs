/**
 * Created by majiangtao on 2017/9/21.
 */
var gulp = require('gulp');
var less = require('gulp-less'); //less编译
var uglify = require('gulp-uglify'); //js压缩
var cssmin = require('gulp-minify-css'); //css压缩
var htmlmin = require('gulp-minify-html'); //html压缩
var imagemin = require('gulp-imagemin'); //图片压缩
var jshint = require('gulp-jshint'); //js代码检查
var jslint = require('gulp-jslint'); //js代码检查(比较严格)
var babel = require('gulp-babel'); //es6转es5
var concat = require('gulp-concat'); //文件合并
var browserSync = require('browser-sync');

gulp.task('default',['watch'], function () {
    console.log('默认任务');
});

//图片压缩
gulp.task('imagemin', function () {
    gulp.src('public/images/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
});
//创建js编译任务，压缩合并
gulp.task('minify-js', function () {
    gulp.src('public/javascripts/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(jshint())
        .pipe(jslint())
        .pipe(uglify())
        .pipe(gulp.dest('build/javascript'));
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
gulp.task('watch',['imagemin','less','minify-js','browserSync'], function () {
    //添加监听事件
    gulp.watch('public/images/*.*',['imagemin']);
    gulp.watch('public/less/*.less',['less']);
    gulp.watch('public/javascripts/*.js',['minify-js']);

    //根目录下任何变化涮新页面
    gulp.watch('build/**/*.*').on('change',reload);
});