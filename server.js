/* eslint-disable import/no-extraneous-dependencies */
import express, { static } from 'express';
import next from 'next';
import { join } from 'path';
import { parse } from 'url';
import { isMaster, fork, on } from 'cluster';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const numCPUs = require('os').cpus().length;

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

// Multi-process to utilize all CPU cores.
if (!dev && isMaster) {
  console.log(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i += 1) {
    fork();
  }

  on('exit', (worker, code, signal) => {
    console.error(
      `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
    );
  });
} else {
  const nextApp = next({ dir: '.', dev });
  const nextHandler = nextApp.getRequestHandler();

  nextApp.prepare().then(() => {
    const server = express();

    if (!dev) {
      // Enforce SSL & HSTS in production
      // eslint-disable-next-line consistent-return
      server.use((req, res, nextCb) => {
        const proto = req.headers['x-forwarded-proto'];
        if (proto === 'https') {
          res.set({
            'Strict-Transport-Security': 'max-age=31557600', // one-year
          });
          return nextCb();
        }
        res.redirect(`https://${req.headers.host}${req.url}`);
      });
    }

    server.use(
      '/public/static',
      static(join(__dirname, 'public/static'), {
        maxAge: dev ? '0' : '365d',
      })
    );

    server.get('*', (req, res) => {
      const parsedUrl = parse(req.url, true);
      nextHandler(req, res, parsedUrl);
    });

    server.listen(port, err => {
      if (err) throw err;
      console.log(`Listening on http://localhost:${port}`);
    });
  });
}
