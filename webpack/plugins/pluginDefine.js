import {DefinePlugin} from 'webpack';

import {isDev, isDevServer, isProd, mode, apiUrl, googleMapApiKey } from '../utils/env';

const config = {
    'process.env': {
        NODE_ENV: JSON.stringify(mode),
        API_URL: JSON.stringify(apiUrl),
        GOOGLE_MAP_API_KEY: JSON.stringify(googleMapApiKey),
    },
    IS_PROD: isProd,
    IS_DEV: isDev,
    IS_DEV_SERVER: isDevServer,
};

export const definePlugin = new DefinePlugin(config);
