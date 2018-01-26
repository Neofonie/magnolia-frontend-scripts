const gulpLoadPlugins = require('gulp-load-plugins');

const gplugin = gulpLoadPlugins({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[-.]/
});

module.exports = gplugin;
