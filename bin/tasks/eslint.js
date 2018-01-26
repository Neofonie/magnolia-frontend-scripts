const gulp      = require('gulp'),
    config      = require('../config'),
    gulpPlugins = require('../utils/gulpPlugins');

const eslint = () => {
    return gulp
        .src(config.scripts.src)
        .pipe(gulpPlugins.eslint())
        .pipe(gulpPlugins.eslint.format());
};

module.exports = eslint;
