import express from 'express';
import axios from 'axios';
import { get_departures } from './apiCalls.js';

const PORT = process.env.PORT || 3001;

const app = express();

// app.get('/api', (req, res) => {
//     res.json({ message: 'Hello from server!' });
// });

app.get('/api/departures', async (req, res) => {
    try {
        const departures = await get_departures();
        res.json({
            departures: departures,
        });
    } catch (e) {
        res.status(500).send('Unable to retrieve departures');
    }
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
