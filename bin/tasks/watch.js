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

const watch = (done) => {
    gulp.watch(config.fonts.src,            gulp.series(copyFonts));
    gulp.watch(config.images.src,           gulp.series(images, copyMagnoliaWebresources));
    gulp.watch(config.magnoliaLight.src,    gulp.series(copyMagnoliaLight));
    gulp.watch(config.scripts.mainSrc,      gulp.series(eslint, scripts, copyMagnoliaWebresources));
    gulp.watch(config.scripts.src,          gulp.series(eslint, scripts, copyMagnoliaWebresources));
    gulp.watch(config.server.src,           gulp.series(server));
    gulp.watch(config.styles.src,           gulp.series(scsslint, cleanStyles, styles, copyMagnoliaWebresources));
    gulp.watch(config.templates.src,        gulp.series(scripts, copyMagnoliaWebresources));
    gulp.watch(config.tests.src,            gulp.series(tests));
    gulp.watch(config.views.src,            gulp.series(views, index));
    done();
};

module.exports = watch;
