var gulp = require('gulp'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    livereload = require('gulp-livereload'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    glob = require('glob'),
    es = require('event-stream'),
    flatten = require('gulp-flatten'),
    templateCache = require('gulp-angular-templatecache'),
    beautify = require('gulp-beautify'),
    config = require('../config');

//JS Watch
gulp.task('js:watch', ['js-tasks', 'browserify', 'minify-angular', 'gen-templateCache'], function() {
    var server = livereload();
    gulp.watch('js/*.js', ['js-tasks']);
    gulp.watch(config.publicRoot + '/dist/js/angularApps/*.js');
    gulp.watch(['app/client/pages/**/*.js','app/client/global/**/*.js'], ['browserify']);
    //gulp.watch('app/client/pages/page1/views/about/markup/about.html', ['gen-templateCache']);
    gulp.watch(['app/client/pages/**/views/**/markup/*.html', 'app/client/pages/**/core/**/markup/*.html'], ['gen-templateCache']);
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

gulp.task('browserify', function(done) {
    // Single entry point to browserify
    var pattern = 'app/client/pages/*/*.js';
    //var paths = ['app/client/pages/*/*.js', '!app/client/pages/*/*.config.js','!app/client/pages/*/partials.js'];

    //globArray(paths, globOptions, function(er, files) {
    var files = glob.sync(pattern);
    var verifiedFiles = [];
    files.forEach(function(file) {
        if (file.indexOf(".config.js") === -1 && file.indexOf("partials.js") === -1) {
            verifiedFiles.push(file);
        }
    });

    var tasks = verifiedFiles.map(function(entry) {
        console.log("Entry :", entry);
        return browserify({
                entries: [entry],
                insertGlobals: true,
                debug: !gulp.env.production
            })
            .bundle()
            .pipe(source(entry))
            .pipe(plumber())
            .pipe(rename({
                extname: '.app.js'
            }))
            .pipe(flatten())
            .pipe(gulp.dest(config.publicRoot + '/dist/js/angularApps'));
    });
    es.merge(tasks).on('end', done);


});

gulp.task('gen-templateCache', function(done) {
    var partialName = '';
    var destination = '';
    var viewsPath = '';
    var pattern = 'app/client/pages/*';
    var globalTemplatePattern = 'app/client/global';

    var files = glob.sync(pattern);

    console.log(typeof(files));

    var tasks = files.map(function(page) {
        console.log("Page :", page);
        var pageIndex = page.lastIndexOf('/');
        var pageName = page.substring(pageIndex+1);
        return gulp.src([page+'/views/*/markup/*.html', page+'/core/*/markup/*.html',globalTemplatePattern+'/views/*/markup/*.html'])
            .pipe(templateCache('partials.js', {
                module: 'pageApp',
                transformUrl: function(url) {
                    console.log("\nURL :", url);
                    var ind = url.lastIndexOf('\\');
                    //console.log("Index :",ind);
                    partialName = url.substring(ind + 1);
                    //console.log("FileName : ", partialName);
                    var viewsIndex = url.indexOf('\\');
                    viewsPath = url.substring(0, viewsIndex);
                    //console.log("Views Path :", viewsPath);
                    //destination = "./app/client/pages/" + viewsPath;
                    //console.log("Destination Path :", destination);
                    return partialName;
                },
                moduleSystem: 'Browserify'
            }))
            .pipe(rename(
                function(path) {
                    console.log("Path Before :", path);
                    path.dirname = pageName;
                    console.log("page Name :",pageName);
                    path.basename = pageName;
                    path.extname = '.partials.js';
                    console.log("Path After :", path);
                }))
            .pipe(beautify({
                indentSize: 4
            }))
            .pipe(gulp.dest(function() {
                return "./app/client/pages/";
            }));
    });
    es.merge(tasks).on('end', done);

    //

});
