import getConfig from 'next/config';

export type RuntimeEnvs = {
  serverRuntimeConfig: {
    API_URL: string;
    API_TOKEN: string;
  };
};

export const { serverRuntimeConfig }: RuntimeEnvs = getConfig();
