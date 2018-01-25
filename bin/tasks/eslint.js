const gulp      = require('gulp'),
    gulpPlugins = require('../utils/gulpPlugins');

module.exports = () => {
    return gulp
        .src('./gulp/**/*.js')
        .pipe(gulpPlugins.eslint())
        .pipe(gulpPlugins.eslint.format());
};
