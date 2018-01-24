import gulp     from 'gulp';
import babel    from 'gulp-babel';
import nodemon  from 'gulp-nodemon';
import flog     from 'fancy-log';
import config   from '../config';
import {reload} from '../utils/utils';

const server = () => {
    flog.info('compile server', config.server.src);

    return gulp
        .src(config.server.src)
        .pipe(babel())
        .pipe(gulp.dest(config.server.dest))
        .pipe(reload());
};

const start = (done) => {
    let started = false;

    nodemon({
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
        .on('restart', function (cb) {
            flog.info('nodemon restart');
            if (!started) {
                done();
                started = true;
            }
        });
};

export {server, start};
