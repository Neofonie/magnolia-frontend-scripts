import gulp from 'gulp';
import eslint from './eslint';
import scsslint from './scsslint';

const check = gulp.series(
    eslint,
    scsslint
);

export default check;