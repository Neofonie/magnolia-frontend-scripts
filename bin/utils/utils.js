import browserSync  from 'browser-sync';
import flog         from 'fancy-log';
import through2     from 'through2';

const letItCrash = (error) => {
    throw error;
};

const failQuietly = (error, done) => {
    flog.error('# ERROR ###############################################');
    flog.error(error.toString());
    flog.error('#######################################################');
    if (done) {
        done();
    }
};

const handleError = (error, done) => {
    if (global.env.environment === 'production') {
        letItCrash(error);
    } else {
        failQuietly(error, done);
    }
};

/**
 * Replaces deprecated gulp-util.noop function
 * Taken from https://stackoverflow.com/questions/25605469/how-do-you-create-an-empty-stream-in-gulp
 * @returns {*}
 */
const noop = () =>  {
    return through2.obj();
};

const reload = () => {
    if (browserSync.active) {
        return browserSync.reload({stream: true});
    }

    return noop();
};

export { handleError, noop, reload };
