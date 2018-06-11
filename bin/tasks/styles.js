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

    var tasks = config.themes.bundles.map(function(theme) {
        console.log('build style ' + theme.css.src + ' => ' + theme.css.dest);
        return gulp.src(theme.css.src, {allowEmpty: true})
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
        .pipe(gulp.dest(theme.css.dest))
        .pipe(reload());
    });

    return merge(tasks);
};

module.exports = styles;
