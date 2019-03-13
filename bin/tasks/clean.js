const del   = require('del'),
    config  = require('../config'),
    flog    = require('fancy-log');

const cleanAll = () => {
    flog.info('clean all');
    return del([config.basePaths.dist]);
};

const cleanStyles = () => {
    flog.info('clean styles');

    var sources = [];

    var tasks = config.themes.bundles.map(function(theme) {
        flog.info('\tclean style ' + theme.css.dest);

        sources.push(theme.css.dest);
    });

    return del(sources);
};

module.exports = { cleanAll, cleanStyles };
