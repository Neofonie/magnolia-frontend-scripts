const gulp      = require('gulp'),
    config      = require('../config'),
    gulpPlugins = require('../utils/gulpPlugins'),
    {reload}    = require('../utils/utils');

const images = () => {
    return gulp
        .src(config.images.src)
        .pipe(gulpPlugins.imagemin())
        .pipe(gulp.dest(config.images.dest))
        .pipe(reload());
};

module.exports = images;
