const gulp      = require('gulp'),
    config      = require('../config');

// Copy fonts into webresources
const copyFonts = () => {
    return gulp
        .src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
};

// Copy webresources from 'frontend/dist/web' to Magnolias light module.
const copyMagnoliaWebresources = () => {
    return gulp
        .src(config.magnoliaWebresources.src)
        .pipe(gulp.dest(config.magnoliaWebresources.dest));
};

// Copy the bechtle-ui folder to the bechtle-webapp folder.
const copyMagnoliaLight = () => {
    return gulp
        .src(config.magnoliaLight.src)
        .pipe(gulp.dest(config.magnoliaLight.dest));
};
module.exports = { copyFonts, copyMagnoliaLight, copyMagnoliaWebresources };