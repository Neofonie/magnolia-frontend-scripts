const gulp      = require('gulp'),
    config      = require('../config'),
    { reload }  = require('../utils/utils');

const index = () => {
    return gulp
        .src(config.views.mainSrc, {allowEmpty: true})
        .pipe(gulp.dest(config.views.dest))
        .pipe(reload());
};

const views = () => {
    return gulp
        .src(config.views.src)
        .pipe(gulp.dest(config.views.dest));
};

module.exports = { views, index };
