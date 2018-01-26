const browserSync = require('browser-sync');

const sync = (done) => {
    browserSync.init(null, {
        proxy: 'localhost:3000',
        browser: 'google chrome',
        port: 7000,
        open: false
    });
    done();
};

module.exports = sync;
