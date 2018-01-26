const gulp = require('gulp'),
    sassLint = require('gulp-sass-lint'),
    config = require('../config');

const scss = () => {
    return gulp
        .src(config.styles.src, {allowEmpty: true})
        .pipe(sassLint({
            configFile: '.sasslintrc'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
};

module.exports = scss;
