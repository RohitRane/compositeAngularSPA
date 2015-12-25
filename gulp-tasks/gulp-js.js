var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    flatten = require('gulp-flatten'),
    config = require('../config');

//JS Watch
gulp.task('js:watch', ['js-tasks','browserify'], function() {
	var server = livereload();
    gulp.watch('js/*.js', ['js-tasks']);
    gulp.watch('app/client/pages/**/core/*.js', ['browserify']);
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

gulp.task('browserify', function() {
	// Single entry point to browserify
	gulp.src('app/client/pages/**/core/*.js')
		.pipe(browserify({
		  insertGlobals : true,
		  debug : !gulp.env.production
		}))
    .pipe(flatten())
		.pipe(gulp.dest(config.publicRoot+'/dist/js/angularApps'));
});
