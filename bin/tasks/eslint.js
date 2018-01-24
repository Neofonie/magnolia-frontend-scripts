import gulp from 'gulp';
import gulpPlugins from '../utils/gulpPlugins';

const eslint = () => {
    return gulp
        .src('./gulp/**/*.js')
        .pipe(gulpPlugins.eslint())
        .pipe(gulpPlugins.eslint.format());
};

export default eslint;