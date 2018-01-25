const del   = require('del'),
    config  = require('../config');

const cleanAll = () => {
    return del([config.basePaths.dist]);
};

const cleanStyles = () => {
    return del([config.styles.dest]);
};

module.exports = { cleanAll, cleanStyles };
