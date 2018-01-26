const gulp          = require('gulp'),
    styles          = require('./styles'),
    scripts         = require('./scripts'),
    check           = require('./check'),
    tests           = require('./tests'),
    images          = require('./images'),
    svg             = require ('./svg'),
    { copyMagnoliaWebresources, copyMagnoliaLight, copyFonts }
                        = require ('./copy'),
    { cleanAll }        = require('./clean'),
    { index, views }    = require('./views'),
    { server }          = require('./server');

const build = gulp.series(
    check,
    tests,
    cleanAll,
    gulp.parallel(styles, views, images, svg, copyFonts, server),
    scripts,
    index,
    copyMagnoliaWebresources,
    copyMagnoliaLight,
    copyFonts
);

module.exports = build;
