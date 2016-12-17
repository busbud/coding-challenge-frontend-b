const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

require('dotenv').config()

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('public/index.html' , { root : __dirname});
});

app.get('/getToken', (req, res) => {
  res.send(process.env.token);
});

app.get('*', (req, res) => {
  res.status(404).send('<h1 style="text-align:center;">Error 404</h1>');
});

app.listen(port, () => {
  console.log(`listening on port ${ port }`);
});
