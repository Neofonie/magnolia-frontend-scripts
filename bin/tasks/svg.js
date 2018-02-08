const gulp      = require('gulp'),
    config      = require('../config'),
    flog        = require('fancy-log'),
    gulpPlugins = require('../utils/gulpPlugins'),
    { handleError } = require('../utils/utils');

const svg = () => {
    flog.info('create svg sprite');

    return gulp
        .src(config.svg.src)
        .pipe(gulpPlugins.svgmin())
        .pipe(gulpPlugins.svgstore())
        .pipe(gulpPlugins.rename(config.svg.spriteName))
        .on('error', handleError)
        .pipe(gulp.dest(config.svg.dest));
};

module.exports = svg;
