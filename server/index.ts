import express from 'express';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 4000;
const buildPath = path.join(__dirname, '..', 'client', 'dist');

app.use(express.static(buildPath));

app.use((req, res, next) => {
    res.sendFile(buildPath);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
