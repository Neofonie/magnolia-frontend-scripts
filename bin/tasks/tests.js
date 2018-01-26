const gulp      = require('gulp'),
    config      = require('../config'),
    gulpPlugins = require('../utils/gulpPlugins'),
    tapColorize = require('tap-colorize');

const tests = () => {
    return gulp
        .src(config.tests.src)
        .pipe(gulpPlugins.tape({
            reporter: tapColorize()
        }));
};

module.exports = tests;
