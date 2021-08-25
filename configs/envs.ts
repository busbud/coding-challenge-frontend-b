import getConfig from 'next/config';

export type RuntimeEnvs = {
  publicRuntimeConfig: {
    POLLING_INTERVAL: number
  }
  serverRuntimeConfig: {
    API_URL: string;
    API_TOKEN: string;
  }
}

export const { publicRuntimeConfig, serverRuntimeConfig }: RuntimeEnvs = getConfig();
