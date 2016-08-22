/**
 * GULP PLUGINS
 */

var gulp            = require('gulp'),
    plugins         = require('gulp-load-plugins')(),
    refresh         = require('gulp-livereload'),
    runSequence     = require('run-sequence');

/**
 * OTHER PLUGINS
 */

var browserify      = require('browserify'),
    del             = require('del'),
    express         = require('express'),
    lrserver        = require('tiny-lr')(),
    livereload      = require('connect-livereload'),
    buffer          = require('vinyl-buffer'),
    source          = require('vinyl-source-stream'),
    stylish         = require('jshint-stylish');

/**
 * CONFIGS
 */

var config          = require('./config.json'),
    dirs            = config.directories;

/**
 * SUB TASKS
 */

// Detect errors and potential problems in your css code
gulp.task('csslint', function () {
    return gulp.src([dirs.src + 'css/*.less', '!'+dirs.src +'css/libs'])
        .pipe(plugins.csslint('.csslintrc'))
        .pipe(plugins.csslint.reporter())
});

// Detect errors and potential problems in your JavaScript code (except vendor scripts)
// You can enable or disable default JSHint options in the .jshintrc file
gulp.task('jshint', function () {
    return gulp.src([dirs.src + 'js/**/*.js', '!'+dirs.src + 'js/vendor/**'])
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter(stylish));
});

// Detect errors and potential problems in your html code
gulp.task('htmlhint', function () {
    return gulp.src([dirs.src + '*.html'])
        .pipe(plugins.htmlhint())
        .pipe(plugins.htmlhint.reporter());
});

// Optimize images with imagemin
gulp.task('imgoptimize', function () {
    return gulp.src(dirs.src + 'img/**/*')
        .pipe(plugins.imagemin(config.imagemin))
        .pipe(gulp.dest(dirs.src + 'img'));
});

// Clear the destination folder
gulp.task('clean', function (cb) {
    del(['./' + dirs.dist]).then(function () { cb(); });
});

// Browserify task
gulp.task('browserify', function() {
    return browserify({ entries: [dirs.src + 'js/main.js'] })
        .bundle()
        .pipe(source('main.bundled.js'))
        .pipe(buffer())
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist + '/js'));
});

//
gulp.task('vendorscripts', function () {
    // Minify and copy all vendor scripts
    return gulp.src([dirs.src + 'js/vendor/*'])
        .pipe(plugins.uglify())
        .pipe(gulp.dest(dirs.dist + 'js/vendor'));
});

// Copy all application files except *.less and .js into the `dist` folder
gulp.task('files', function () {
    return gulp.src([dirs.src + '**/*', '!'+dirs.src + '*.html', '!'+dirs.src + 'js/**/*.js',
        '!'+dirs.src + 'css/**/*.less'], { dot: true })
        .pipe(gulp.dest(dirs.dist));
});

// Compile LESS files
gulp.task('css', function () {
    return gulp.src(dirs.src + 'css/main.css')
        .pipe(plugins.less())
        .pipe(plugins.autoprefixer(config.autoprefixer))
        .pipe(plugins.rename('main.css'))
        .pipe(plugins.csso())
        //.pipe(plugins.rev())
        .pipe(gulp.dest(dirs.dist + 'css'))
});

//
gulp.task('images', function () {
    return gulp.src(dirs.src + 'img/**/*.jpg')
        .pipe(gulp.dest(dirs.dist + 'img'));
});

//
gulp.task('markup', function() {
    // Get our index.html
    return gulp.src(dirs.src + '*.html')
        // And put it in the dist folder
        .pipe(gulp.dest(dirs.dist))
        .pipe(refresh(lrserver)); // Tell the lrserver to refresh
});

//
gulp.task('serve', ['images', 'files', 'vendorscripts', 'browserify', 'css', 'markup'], function () {
    // Set up an express server (but not starting it yet)
    var server = express();
    // Add live reload
    server.use(livereload({port: config.ports.livereload}));
    // Use our 'dist' folder as rootfolder
    server.use(express.static('./' + dirs.dist));

    // Start webserver
    server.listen(config.ports.express);
    // Start live reload
    lrserver.listen(config.ports.livereload);

    gulp.watch([dirs.src + 'js/**/*.js'],[
        'browserify'
    ]);
    gulp.watch([dirs.src + 'css/**/*.less'], [
        'css'
    ]);
    gulp.watch([dirs.src + '*.html'], [
        'markup'
    ]);
});

gulp.task('html', ['images', 'files', 'vendorscripts', 'browserify', 'css'] , function() {
    // We src all html files
    return gulp.src(dirs.src + '*.html')
        .pipe(plugins.htmlmin(config.htmlmin))
        .pipe(gulp.dest(dirs.dist));
});

/**
 * MAIN TASKS
 */

gulp.task('check',      ['jshint', 'csslint', 'htmlhint', 'imgoptimize']);

gulp.task('dev',        ['serve']);

gulp.task('default',    function (cb) { runSequence('clean', 'html', cb) });
