const browserSync = require('browser-sync');

module.exports = (done) => {
    browserSync.init(null, {
        proxy: 'localhost:3000',
        browser: 'google chrome',
        port: 7000,
        open: false
    });
    done();
};
