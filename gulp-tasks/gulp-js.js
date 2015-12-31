var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    browserify = require('gulp-browserify'),
    flatten = require('gulp-flatten'),
    templateCache = require('gulp-angular-templatecache'),
    beautify = require('gulp-beautify'),
    config = require('../config');

//JS Watch
gulp.task('js:watch', ['js-tasks', 'browserify', 'minify-angular', 'gen-templateCache'], function() {
    var server = livereload();
    gulp.watch('js/*.js', ['js-tasks']);
    gulp.watch(config.publicRoot + '/dist/js/angularApps/*.js', ['minify-angular']);
    gulp.watch('app/client/pages/**/*.js', ['browserify']);
    //gulp.watch('app/client/pages/page1/views/about/markup/about.html', ['gen-templateCache']);
    gulp.watch(['app/client/pages/**/views/**/markup/*.html','app/client/pages/**/core/**/markup/*.html'], ['gen-templateCache']);
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
    gulp.src(['app/client/pages/**/*.js', '!app/client/pages/**/*.config.js','!app/client/pages/**/partials.js'])
        .pipe(plumber())
        .pipe(browserify({
            insertGlobals: true,
            debug: !gulp.env.production
        }))
        .pipe(flatten())
        .pipe(gulp.dest(config.publicRoot + '/dist/js/angularApps'));
});

gulp.task('gen-templateCache', function() {
    var destination = '';
    return gulp.src(['app/client/pages/**/views/**/markup/*.html','app/client/pages/**/core/**/markup/*.html'])
        .pipe(templateCache('partials.js', {
            module: 'pageApp',
            transformUrl: function(url) {
                //console.log("\nURL :",url);
                var ind = url.lastIndexOf('\\');
                //console.log("Index :",ind);
                var partialName = url.substring(ind + 1);
                //console.log("FileName : ", partialName);
                var viewsIndex = url.indexOf('\\');
                var viewsPath = url.substring(0, viewsIndex);
                //console.log("Views Path :", viewsPath);
                destination = "./app/client/pages/" + viewsPath;
                //console.log("Destination Path :",destination);
                return partialName;
            },
            moduleSystem: 'Browserify'
        }))
        .pipe(beautify({indentSize: 4}))
        .pipe(gulp.dest(function() {
            return destination;
        }));
});
