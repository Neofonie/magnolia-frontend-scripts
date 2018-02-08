const del   = require('del'),
    config  = require('../config'),
    flog    = require('fancy-log');

const cleanAll = () => {
    flog.info('clean all');
    return del([config.basePaths.dist]);
};

const cleanStyles = () => {
    flog.info('clean styles');
    return del([config.styles.dest]);
};

module.exports = { cleanAll, cleanStyles };
