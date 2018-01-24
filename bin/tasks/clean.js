import del from 'del';
import config from '../config';

const cleanAll = () => {
    return del([config.basePaths.dist]);
};

const cleanStyles = () => {
    return del([config.styles.dest]);
};

export { cleanAll, cleanStyles };