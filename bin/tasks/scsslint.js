const gulp      = require('gulp'),
    config      = require('../config'),
    flog        = require('fancy-log'),
    sassLint    = require('gulp-sass-lint');

const scss = () => {
    flog.info('lint styles');

    return gulp
        .src(config.styles.src, {allowEmpty: true})
        .pipe(sassLint({
            configFile: '.sasslintrc'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
};

module.exports = scss;
