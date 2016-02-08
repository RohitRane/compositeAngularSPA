"use strict";

var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint');

require("jshint-stylish");

gulp.task('node-server', function() {
    nodemon({
            script: 'index.js',
            ext: 'html js',
            ignore: ['app/client/**/*.*', 'public/**/*.*'],
            tasks: ['lint']
        })
        .on('restart', function() {
            console.log('restarted!')
        })
});

gulp.task('lint', function() {
    var jshintOpts = {
        "node": true
    };
    return gulp.src(['app/server/**/*.js', './*.js'])
        .pipe(jshint(jshintOpts))
        .pipe(jshint.reporter('jshint-stylish'));
});
