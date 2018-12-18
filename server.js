const express = require('express');
const app = express();
const path = require("path");
const port = 3000

app.use(express.static(path.join(__dirname, "/dist")));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"))
});

app.listen(process.env.PORT || port)