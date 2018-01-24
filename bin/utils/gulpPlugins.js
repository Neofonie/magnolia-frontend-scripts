import gulpLoadPlugins from 'gulp-load-plugins';

export default gulpLoadPlugins({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[-.]/
});