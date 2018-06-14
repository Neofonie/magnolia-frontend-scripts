const del   = require('del'),
    config  = require('../config'),
    flog    = require('fancy-log'),
    merge   = require('merge-stream');

const cleanAll = () => {
    flog.info('clean all');
    return del([config.basePaths.dist]);
};

const cleanStyles = () => {
    flog.info('clean styles');

    var tasks = config.themes.bundles.map(function(theme) {
        flog.info('\tclean style ' + theme.css.dest);

        return del([theme.css.dest]);
    });

    return merge(tasks);
};

module.exports = { cleanAll, cleanStyles };
