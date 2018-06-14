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

const styles = () => {
    flog.info('compile styles');

    var tasks = config.themes.bundles.map(function(theme) {
        flog.info('\tbuild style ' + theme.css.src + ' => ' + theme.css.dest);

        let orderedStyleFiles = gulp.src(theme.css.src, {allowEmpty: true, read: false})
        .pipe(gulpPlugins.order(theme.css.src, {base: config.basePaths.root}));
    

        return gulp.src(theme.css.src_main, {allowEmpty: true})
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
