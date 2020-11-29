import express from 'express';
import * as path from 'path';

const app = express();
const port = process.env.PORT || 4000;
const buildPath = path.join(__dirname, '..', 'client', 'dist');

app.use(express.static(buildPath));

app.get('/api/token', async (req: any, res: any) => {
    const token = process.env.TOKEN || ''
    res.send(token);
});

app.use((req, res, next) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
