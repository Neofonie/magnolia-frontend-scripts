import gulp from 'gulp';
import minimist from 'minimist';
import build from './tasks/build';
import check from './tasks/check';
import {start} from './tasks/server';
import watch from './tasks/watch';
import browsersync from './tasks/browserSync';
import tests from './tasks/tests';
import svg from './tasks/svg';

global.env = minimist(process.argv);

gulp.task('default', gulp.series(
    build,
    start,
    watch,
    browsersync
));

gulp.task('build', build);
gulp.task('check', check);
gulp.task('watch', watch);

// gulp.task('start', gulp.parallel(start, watch));
gulp.task('tests', tests);
gulp.task('svg', svg);
