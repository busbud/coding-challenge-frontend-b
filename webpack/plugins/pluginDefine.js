import {DefinePlugin} from 'webpack';

import {isDev, isDevServer, isProd, mode, apiUrl, apiKey } from '../utils/env';

const config = {
    'process.env': {
        NODE_ENV: JSON.stringify(mode),
        API_URL: JSON.stringify(apiUrl),
        API_KEY: JSON.stringify(apiKey),
    },
    IS_PROD: isProd,
    IS_DEV: isDev,
    IS_DEV_SERVER: isDevServer,
};

export const definePlugin = new DefinePlugin(config);
