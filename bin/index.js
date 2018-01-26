const gulp      = require('gulp'),
    minimist    = require('minimist'),
    browsersync = require('./tasks/browserSync'),
    build       = require('./tasks/build'),
    check       = require('./tasks/check'),
    svg         = require('./tasks/svg'),
    test        = require('./tasks/tests'),
    watch       = require('./tasks/watch'),
    { start }   = require('./tasks/server');

global.env = minimist(process.argv);

gulp.task('build', build);
gulp.task('check', check);
gulp.task('svg',   svg);
gulp.task('test',  test);
gulp.task('watch', watch);

gulp.task('default', gulp.series(
    build,
    start,
    watch,
    browsersync
));

module.exports = gulp;
