const gulp      = require('gulp'),
    eslint      = require('./eslint'),
    scsslint    = require('./scsslint');

module.exports = gulp.parallel(
    eslint,
    scsslint
);
