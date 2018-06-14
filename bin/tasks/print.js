const gulp      = require('gulp'),
    config      = require('../config'),
    gulpPlugins = require('../utils/gulpPlugins'),
    flog        = require('fancy-log'),
    { noop, reload } = require('../utils/utils'),
    merge       = require('merge-stream');

const sassOptionsDevelopment = {
        errLogToConsole: true,
        outputStyle: 'expanded',
        sourceComments: 'map'
    },
    sassOptionsProduction = {
        errLogToConsole: false,
        outputStyle: 'expanded',
        sourceComments: false
    };

const print = () => {
    flog.info('compile print styles');

    var tasks = config.themes.bundles.map(function(theme) {
        flog.info('\tbuild print ' + theme.print.src + ' => ' + theme.print.dest);

        return gulp.src(theme.print.src, {allowEmpty: true})
            .pipe(gulpPlugins.sass(
                global.env.environment === 'production' ? sassOptionsProduction : sassOptionsDevelopment
            ).on('error', gulpPlugins.sass.logError))
            .pipe(gulpPlugins.autoprefixer(config.autoprefixer))
            .pipe(global.env.environment === 'production' ? gulpPlugins.cleanCss() : noop())
            .pipe(gulp.dest(theme.print.dest))
            .pipe(reload());
    });

    return merge(tasks);
};

module.exports = print;
