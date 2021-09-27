import {join} from 'path';

import {rootDir} from '../utils/env';

export const aliasItems = {
    '@src': join(rootDir, '/src'),
    '@images': join(rootDir, '/public/images'),
    '@styles': join(rootDir, '/src/styles'),
    '@components': join(rootDir, '/src/components'),
};
