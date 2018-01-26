const gulp      = require('gulp'),
    config      = require('../config'),
    eslint      = require('./eslint'),
    images      = require('./images'),
    scripts     = require('./scripts'),
    styles      = require('./styles'),
    tests       = require('./tests'),
    { copyMagnoliaWebresources, copyMagnoliaLight, copyFonts }
                        = require('./copy'),
    { cleanStyles }     = require('./clean'),
    { server }          = require('./server'),
    { views, index }    = require('./views');

// TODO add gulp.parallel
const watch = (done) => {
    gulp.watch(config.styles.src, gulp.series(cleanStyles, styles, index, copyMagnoliaWebresources));
    gulp.watch(config.scripts.src, gulp.series(eslint, scripts, copyMagnoliaWebresources));
    gulp.watch(config.images.src, images, copyMagnoliaWebresources);
    gulp.watch(config.scripts.mainSrc, scripts, copyMagnoliaWebresources);
    gulp.watch(config.templates.src, gulp.series(scripts, copyMagnoliaWebresources));
    gulp.watch(config.tests.src, tests);
    gulp.watch(config.server.src, server);
    gulp.watch(config.views.src, gulp.series(views, index));
    gulp.watch(config.magnoliaLight.src, copyMagnoliaLight);
    gulp.watch(config.fonts.src, copyFonts);
    done();
};

module.exports = watch;
