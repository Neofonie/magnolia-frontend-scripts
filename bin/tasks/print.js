const gulp      = require('gulp'),
    config      = require('../config'),
    gulpPlugins = require('../utils/gulpPlugins'),
    flog        = require('fancy-log'),
    { noop, reload } = require('../utils/utils');

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

    return gulp.src(config.print.mainSrc, {allowEmpty: true})
        .pipe(gulpPlugins.sass(
            global.env.environment === 'production' ? sassOptionsProduction : sassOptionsDevelopment
        ).on('error', gulpPlugins.sass.logError))
        .pipe(gulpPlugins.autoprefixer(config.autoprefixer))
        .pipe(global.env.environment === 'production' ? gulpPlugins.cleanCss() : noop())
        .pipe(gulp.dest(config.print.dest))
        .pipe(reload());
};

module.exports = print;

