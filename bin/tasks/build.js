import gulp from 'gulp';
import styles from './styles';
import { cleanAll } from './clean';
import scripts from './scripts';
import {server} from './server';
import {index, views} from './views';
import check from './check';
import tests from './tests';
import images from './images';
import { copyMagnoliaWebresources, copyMagnoliaLight, copyFonts } from './copy';
import svg from './svg';

const build = gulp.series(
    check,
    tests,
    cleanAll,
    gulp.parallel(styles, views, images, svg, copyFonts, server),
    scripts,
    index,
    copyMagnoliaWebresources,
    copyMagnoliaLight,
    copyFonts
);

export default build;