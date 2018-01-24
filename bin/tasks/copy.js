import gulp from 'gulp';
import config from '../config';

// Copy webresources from 'frontend/dist/web' to Magnolias light module.
const copyMagnoliaWebresources = () => {
    return gulp
        .src(config.magnoliaWebresources.src)
        .pipe(gulp.dest(config.magnoliaWebresources.dest));
};

// Copy the bechtle-ui folder to the bechtle-webapp folder.
const copyMagnoliaLight = () => {
    return gulp
        .src(config.magnoliaLight.src)
        .pipe(gulp.dest(config.magnoliaLight.dest));
};

const copyFonts = () => {
    return gulp
        .src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest));
};

export { copyMagnoliaLight, copyMagnoliaWebresources, copyFonts };