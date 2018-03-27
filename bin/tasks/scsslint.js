const gulp          = require('gulp'),
    gulpSassLint    = require('gulp-sass-lint'),
    config          = require('../config'),
    flog            = require('fancy-log');

const scss = () => {
    flog.info('lint styles');

    return gulp
        .src(config.styles.src, {allowEmpty: true})
        .pipe(gulpSassLint({
            configFile: '.sasslintrc'
        }))
        .pipe(gulpSassLint.format())
        .pipe(gulpSassLint.failOnError());
};

module.exports = scss;
