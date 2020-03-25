const gulp      = require('gulp'),
    babelify    = require('babelify'),
    browserify  = require('browserify'),
    flog        = require('fancy-log'),
    stringify   = require('stringify'),
    source      = require('vinyl-source-stream'),
    config      = require('../config'),
    gulpPlugins = require('../utils/gulpPlugins'),
    { handleError, noop, reload } = require('../utils/utils'),
    merge       = require('merge-stream');

const scripts = (done) => {
    flog.info('compile scripts');

    var tasks = config.themes.bundles.map(function(theme) {
        flog.info('\tbuild script ' + theme.js.src + ' => ' + theme.js.dest);

        return browserify(theme.js.src,
            {
                debug: true //global.env.environment !== 'production'
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
            .pipe(source(theme.name + '.js'))
            .pipe(global.env.environment === 'production' ? gulpPlugins.buffer() : noop())
            .pipe(global.env.environment === 'production' ? gulpPlugins.uglify( {
                "compress": true,
                "mangle": {
                    "keep_fnames":        true
                },
                "output": {
                    "ascii_only":         true,
                    "beautify":           false,
                    "braces":             false,
                    "indent_level":       2,
                    "indent_start":       0,
                    "inline_script":      true,
                    "keep_quoted_props":  false,
                    "max_line_len":       false,
                    "preamble":           null,
                    "preserve_line":      false,
                    "quote_keys":         false,
                    "quote_style":        1,
                    "semicolons":         true,
                    "shebang":            true,
                    "source_map":         null,
                    "width":              80,
                    "wrap_iife":          false,
                    "comments":           "/^@/",
                    "ie8":                false,
                    "webkit":             true
                }
            }) : noop())
            .pipe(gulp.dest(theme.js.dest))
            .pipe(reload());
    });

    return merge(tasks);
};

module.exports = scripts;
