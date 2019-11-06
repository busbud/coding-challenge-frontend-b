import env from './.env';

export const environment = {
  production: true,
  envName: 'PROD',
  api: {
    ...env
  }
};
