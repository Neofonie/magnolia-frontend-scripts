import gulp from 'gulp';
import config from '../config';
import gulpPlugins from '../utils/gulpPlugins';
import {handleError} from '../utils/utils';

const svg = () => {
    return gulp
        .src(config.svg.src)
        .pipe(gulpPlugins.svgmin())
        .pipe(gulpPlugins.svgstore())
        .pipe(gulpPlugins.rename(config.svg.spriteName))
        .on('error', handleError)
        .pipe(gulp.dest(config.svg.dest));
};

export default svg;