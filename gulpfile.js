/**
 * Created by 一水茶缘 on 2017/4/6.
 */
//引入组建
var gulp = require('gulp');
var uglify = require('gulp-uglify');//丑化
var concat = require('gulp-concat');//拼接

gulp.task('scripts', function () {
    gulp.src(['js/controller/controller.js','js/controller/*.js'])
        .pipe(concat('controller.js'))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
    gulp.watch('js/controller/*.js', ['scripts']);//第二个是依赖东西
});