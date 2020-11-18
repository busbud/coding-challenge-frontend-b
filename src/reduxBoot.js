const express = require('express');
const path = require('path');

const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4800;
app.use(express.static(path.resolve(__dirname, '../app/build')));


// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app/build', 'index.html'));
});

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});