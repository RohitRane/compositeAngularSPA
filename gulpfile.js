'use strict';



var gulp = require('gulp');

var requireDir = require('require-dir');
requireDir('./gulp-tasks');

/*Default*/
gulp.task('default', ['js:watch', 'styles:watch'], function() {});
