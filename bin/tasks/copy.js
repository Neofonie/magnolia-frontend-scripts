const gulp  = require('gulp'),
    config  = require('../config'),
    flog    = require('fancy-log');

// Copy fonts into webresources
const copyFonts = () => {
    flog.info('copy fonts');

    return gulp
        .src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
};

// Copy webresources from 'frontend/dist/web' to Magnolias light module.
const copyMagnoliaWebresources = () => {
    flog.info('copy webresources');

    return gulp
        .src(config.magnoliaWebresources.src)
        .pipe(gulp.dest(config.magnoliaWebresources.dest));
};

// Copy the ui folder to the webapp folder.
const copyMagnoliaLight = () => {
    flog.info('copy magnolia (light)');

    return gulp
        .src(config.magnoliaLight.src)
        .pipe(gulp.dest(config.magnoliaLight.dest));
};

module.exports = { copyFonts, copyMagnoliaLight, copyMagnoliaWebresources };
