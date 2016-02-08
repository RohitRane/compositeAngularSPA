'use strict';



var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./gulp-tasks');

/*Default*/
gulp.task('client', ['js:watch', 'styles:watch'], function() {});

gulp.task('server', ['node-server'], function() {});
