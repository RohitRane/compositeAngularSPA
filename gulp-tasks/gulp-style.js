var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    minifyCss = require('gulp-minify-css'),
    plumber = require('gulp-plumber'),
    config = require('../config');

//Styles Watch
gulp.task('styles:watch', ['styles-tasks'], function() {
    gulp.watch('sass/*.scss', ['styles-tasks']);
});

/*Styles Tasks*/

gulp.task('styles-tasks', ['sass-compile', 'minify-css']);


gulp.task('minify-css', function() {
    gulp.watch('dist/css/*.css', function() {
        gulp.src('dist/css/*.css')
            .pipe(plumber())
            .pipe(minifyCss())
            .pipe(rename({
                extname: '.min.css'
            }))
            .pipe(gulp.dest(config.publicRoot+'/dist/css/min'));
    });
});

gulp.task('sass-compile', function() {
    gulp.src('sass/*.scss')
        .pipe(plumber())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(gulp.dest(config.publicRoot+'/dist/css'));
});
