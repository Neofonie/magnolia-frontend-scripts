const gulp = require('gulp'),
    eslint = require('./eslint'),
    scsslint = require('./scsslint');

const check = gulp.parallel(
    eslint,
    scsslint
);

module.exports = check;
