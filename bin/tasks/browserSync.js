import _browserSync from 'browser-sync';

const browserSync = (done) => {
    _browserSync.init(null, {
        proxy: 'localhost:3000',
        browser: 'google chrome',
        port: 7000,
        open: false
    });
    done();
};

export default browserSync;