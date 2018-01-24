import gulp from 'gulp';
import config from '../config';
import {reload} from '../utils/utils';
import gulpPlugins from '../utils/gulpPlugins';

const images = () => {
    return gulp
        .src(config.images.src)
        .pipe(gulpPlugins.imagemin())
        .pipe(gulp.dest(config.images.dest))
        .pipe(reload());
};

export default images;