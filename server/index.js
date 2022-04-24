import express from 'express';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { get_departures } from './serviceCalls/departures.js';

const PORT = process.env.PORT || 3001;
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.resolve(__dirname, '../busbud-webapp/build')));

// I wish I had tests for the routes
// I haven't yet had the chance to test it and from my research
// it involves mucho extra setup with supertest
app.get('/api/departures', async (req, res) => {
    try {
        const departures = await get_departures(req.query);
        res.json({
            departures: departures,
        });
    } catch (e) {
        res.status(500).send('Unable to retrieve departures');
    }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../busbud-webapp/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
