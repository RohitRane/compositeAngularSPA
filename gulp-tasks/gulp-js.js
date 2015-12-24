var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload')
    config = require('../config');

//JS Watch
gulp.task('js:watch', ['js-tasks'], function() {
	var server = livereload();
    gulp.watch('js/*.js', ['js-tasks']);
});

/*JS Tasks*/

gulp.task('js-tasks', ['minify-js']);

//Minify JS
gulp.task('minify-js', function() {
    gulp.src('js/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(config.publicRoot+'/dist/js'))
        .pipe(livereload());
});
