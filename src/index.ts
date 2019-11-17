import express from 'express';
// this require is necessary for server HMR to recover from error
let app = require('./server').default;

if (module.hot) {
  module.hot.accept('./server', () => {
    console.info('🔁  HMR Reloading `./server`...');
    try {
      // eslint-disable-next-line global-require
      app = require('./server').default;
    } catch (error) {
      console.error(error);
    }
  });
  console.info('✅  Server-side HMR Enabled!');
}

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default express()
  .use((req, res) => app.handle(req, res))
  .listen(port, (err: Error) => {
    if (err) {
      console.error(err);
      return;
    }
    console.info(`> Started on port ${port}`);
  });
