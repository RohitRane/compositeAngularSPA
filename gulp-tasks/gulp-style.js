var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    flatten = require('gulp-flatten'),
    config = require('../config');

//Styles Watch
gulp.task('styles:watch', ['styles-tasks'], function() {
    //gulp.watch('sass/*.scss', ['styles-tasks']);
    gulp.watch(['app/client/pages/**/*.scss','app/client/global/views/**/*.scss'], ['styles-tasks']);
});

/*Styles Tasks*/

gulp.task('styles-tasks', ['sass-compile', 'minify-css']);


gulp.task('minify-css', function() {
    gulp.watch(config.publicRoot+'/dist/css/*.css', function() {
        gulp.src(config.publicRoot+'/dist/css/*.css')
            .pipe(plumber())
            .pipe(minifyCss())
            .pipe(rename({
                extname: '.min.css'
            }))
            .pipe(gulp.dest(config.publicRoot+'/dist/css/min'));
    });
});

gulp.task('sass-compile', function() {
    gulp.src('app/client/pages/**/*.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(flatten())
        .pipe(gulp.dest(config.publicRoot+'/dist/css'));
});
