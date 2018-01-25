import gulp from 'gulp';
import config from '../config';
import {noop, reload} from '../utils/utils';
import gulpPlugins from '../utils/gulpPlugins';

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

export default styles;