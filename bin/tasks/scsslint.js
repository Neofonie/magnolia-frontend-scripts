const gulp          = require('gulp'),
    gulpSassLint    = require('gulp-sass-lint'),
    config          = require('../config'),
    flog            = require('fancy-log'),
    merge           = require('merge-stream');

const scss = () => {
    flog.info('lint styles');

    var tasks = config.themes.bundles.map(function(theme) {
        flog.info('\tlint style ' + theme.css.src);

        return gulp.src(theme.css.src, {allowEmpty: true})
            .pipe(gulpSassLint({
                configFile: '.sasslintrc'
            }))
            .pipe(gulpSassLint.format())
            .pipe(gulpSassLint.failOnError());
    });

    return merge(tasks);
};

module.exports = scss;
