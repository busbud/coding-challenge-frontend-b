import path from 'path';
import express from 'express';
import helmet from 'helmet';
import { existsSync } from 'fs';
import { applyMiddleware } from './middleware';

const app = express();
const port = parseInt(process.env.serverPort ?? '8080', 10);
const publicFolderPath = path.resolve(__dirname, 'public');

// Minimal express security
app.use(helmet());
app.disable('x-powered-by');

app.use(express.static(publicFolderPath));

applyMiddleware(app);

app.get('/', (req, res) => {
  const indexHtmlPath = path.resolve(__dirname, 'public/index.html');
  if (existsSync(indexHtmlPath)) {
    return res.sendFile(indexHtmlPath);
  }
  res.status(503).send('Server Internal Error!');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
