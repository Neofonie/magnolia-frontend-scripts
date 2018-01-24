import gulp from 'gulp';
import config from '../config';
import gulpPlugins from '../utils/gulpPlugins';
import tapColorize from 'tap-colorize';

const tests = () => {
    return gulp
        .src(config.tests.src)
        .pipe(gulpPlugins.tape({
            reporter: tapColorize()
        }));
};

export default tests;