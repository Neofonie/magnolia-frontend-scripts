const gulp      = require('gulp'),
    config      = require('../config'),
    gulpPlugins = require('../utils/gulpPlugins'),
    {handleError} = require('../utils/utils');

module.exports = () => {
    return gulp
        .src(config.svg.src)
        .pipe(gulpPlugins.svgmin())
        .pipe(gulpPlugins.svgstore())
        .pipe(gulpPlugins.rename(config.svg.spriteName))
        .on('error', handleError)
        .pipe(gulp.dest(config.svg.dest));
};
