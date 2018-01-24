import gulp         from 'gulp';
import babelify     from 'babelify';
import browserify   from 'browserify';
import source       from 'vinyl-source-stream';
import stringify    from 'stringify';
import config       from '../config';
import gulpPlugins  from '../utils/gulpPlugins';
import {handleError, noop, reload}  from '../utils/utils';

const scripts = (done) => {
    return browserify(config.scripts.mainSrc,
        {
            debug: global.env.environment !== 'production'
        })
        .transform(babelify)
        .transform(stringify, {
            appliesTo: {includeExtensions: ['.html']},
            minify: true,
            minifyOptions: {
                // KockoutJS needs html comments!
                removeComments: false
            }
        })
        .bundle().on('error', (error) => {
            handleError(error, done);
        })
        .pipe(source('neo-bundle.js'))
        .pipe(global.env.environment === 'production' ? gulpPlugins.buffer() : noop())
        .pipe(global.env.environment === 'production' ? gulpPlugins.uglify() : noop())
        .pipe(gulp.dest(config.scripts.dest))
        .pipe(reload());
};

export default scripts;