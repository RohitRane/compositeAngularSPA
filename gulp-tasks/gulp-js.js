var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    flatten = require('gulp-flatten'),
    config = require('../config');

//JS Watch
gulp.task('js:watch', ['js-tasks', 'browserify', 'minify-angular'], function() {
    var server = livereload();
    gulp.watch('js/*.js', ['js-tasks']);
    gulp.watch(config.publicRoot + '/dist/js/angularApps/*.js', ['minify-angular']);
    gulp.watch('app/client/pages/**/*.js', ['browserify']);
    //gulp.watch('app/client/pages/**/*.js', ['browserify']);
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
        .pipe(gulp.dest(config.publicRoot + '/dist/js'))
        .pipe(livereload());
});

//Minify Angular
gulp.task('minify-angular', function() {
    gulp.src(config.publicRoot + '/dist/js/angularApps/*.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest(config.publicRoot + '/dist/js/angularApps/min'))
        .pipe(livereload());
});

gulp.task('browserify', function() {
    // Single entry point to browserify
    gulp.src(['app/client/pages/*/*.js','!app/client/pages/*/*.config.js'])
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(flatten())
        .pipe(gulp.dest(config.publicRoot + '/dist/js/angularApps'));
});
