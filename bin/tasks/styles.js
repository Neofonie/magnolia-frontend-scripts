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

const styles = () => {
    flog.info('compile styles');

    const orderedStyleFiles = gulp.src(config.styles.src, {allowEmpty: true, read: false})
        .pipe(gulpPlugins.order(config.styles.src, {base: config.basePaths.root}));

    return gulp.src(config.styles.mainSrc, {allowEmpty: true})
        .pipe(gulpPlugins.inject(orderedStyleFiles, {
            starttag: '// inject:{{ext}}',
            endtag: '// endinject',
            transform: function (filepath) {
                filepath = filepath.replace('_', '');
                return '@import "' + filepath + '";';
            },
            relative: true
        }))
        .pipe(gulpPlugins.sass(
            global.env.environment === 'production' ? sassOptionsProduction : sassOptionsDevelopment
        ).on('error', gulpPlugins.sass.logError))
        .pipe(gulpPlugins.autoprefixer(config.autoprefixer))
        .pipe(global.env.environment === 'production' ? gulpPlugins.cleanCss() : noop())
        .pipe(gulp.dest(config.styles.dest))
        .pipe(reload());
};

module.exports = styles;
