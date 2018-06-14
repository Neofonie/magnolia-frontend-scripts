const gulp          = require('gulp'),
    styles          = require('./styles'),
    scripts         = require('./scripts'),
    print           = require('./print'),
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
    gulp.parallel(
        styles,
        print,
        views,
        images,
        svg,
        copyFonts,
        server
    ),
    scripts,
    index,
    copyMagnoliaWebresources,
    copyMagnoliaLight
);

module.exports = build;
