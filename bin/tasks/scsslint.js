import gulp from 'gulp';
import config from '../config';
import sassLint from 'gulp-sass-lint';

const scsslint = () => {
    return gulp
        .src(config.styles.src)
        .pipe(sassLint({
            configFile: '.sasslintrc'
        }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError());
};

export default scsslint;