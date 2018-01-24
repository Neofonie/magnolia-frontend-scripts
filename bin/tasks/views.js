import gulp from 'gulp';
import config from '../config';
import {reload} from '../utils/utils';

const index = () => {
    return gulp
        .src(config.views.mainSrc)
        .pipe(gulp.dest(config.views.dest))
        .pipe(reload());
};

const views = () => {
    return gulp
        .src(config.views.src)
        .pipe(gulp.dest(config.views.dest));
};

export {views, index};