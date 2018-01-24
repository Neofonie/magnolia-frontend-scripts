import gulp from 'gulp';
import {cleanStyles } from './clean';
import config from '../config';
import {copyMagnoliaWebresources, copyMagnoliaLight, copyFonts} from './copy';
import eslint from './eslint';
import images from './images';
import scripts from './scripts';
import {server} from './server';
import styles from './styles';
import tests from './tests';
import {views, index} from './views';

const watch = (done) => {
    gulp.watch(config.styles.src, gulp.series(cleanStyles, styles, index, copyMagnoliaWebresources));
    gulp.watch(config.scripts.src, gulp.series(eslint, scripts, copyMagnoliaWebresources));
    gulp.watch(config.images.src, images, copyMagnoliaWebresources);
    gulp.watch(config.scripts.mainSrc, scripts, copyMagnoliaWebresources);
    gulp.watch(config.templates.src, gulp.series(scripts, copyMagnoliaWebresources));
    gulp.watch(config.tests.src, tests);
    gulp.watch(config.server.src, server);
    gulp.watch(config.views.src, gulp.series(views, index));
    gulp.watch(config.magnoliaLight.src, copyMagnoliaLight);
    gulp.watch(config.fonts.src, copyFonts);
    done();
};

export default watch;