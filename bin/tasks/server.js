const gulp      = require('gulp'),
    gulpBabel   = require('gulp-babel'),
    gulpNodemon = require('gulp-nodemon'),
    flog        = require('fancy-log'),
    config      = require('../config'),
    { reload }  = require('../utils/utils');

const server = () => {
    flog.info('compile server', config.server.src);

    return gulp
        .src(config.server.src)
        // .pipe(gulpBabel())
        .pipe(gulp.dest(config.server.dest))
        .pipe(reload());
};

const start = (done) => {
    let started = false;

    gulpNodemon({
        script: `${config.basePaths.dist}/server.js`,
        watch: `${config.basePaths.dist}/config`
    })
        .on('start', function () {
            // to avoid nodemon being started multiple times
            // thanks @matthisk
            flog.info('nodemon start');
            if (!started) {
                done();
                started = true;
            }
        })
        .on('restart', function () {
            flog.info('nodemon restart');
            if (!started) {
                done();
                started = true;
            }
        });
    done();
};

module.exports = { server, start };
