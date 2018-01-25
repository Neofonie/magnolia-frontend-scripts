const gulpLoadPlugins = require('gulp-load-plugins');

module.exports = gulpLoadPlugins({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[-.]/
});