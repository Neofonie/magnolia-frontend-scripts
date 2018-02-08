const gulp      = require('gulp'),
    config      = require('../config'),
    flog        = require('fancy-log'),
    gulpPlugins = require('../utils/gulpPlugins');

const eslint = () => {
    flog.info('lint scripts');

    return gulp
        .src(config.scripts.src)
        .pipe(gulpPlugins.eslint())
        .pipe(gulpPlugins.eslint.format());
};

module.exports = eslint;
