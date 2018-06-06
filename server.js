const express = require('express');
const path = require('path');

const app = express();

app.use(express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const APP_PORT = process.env.PORT || 8080;

const server = app.listen(APP_PORT, () => {
  const host = server.address().address;
  const serverPort = server.address().port;

  console.log('Osheaga React listening at http://%s:%s', host, serverPort);
});
