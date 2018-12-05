const express = require('express');
const path = require('path');
const port = process.env.PORT || 8080; // eslint-disable-line
const app = express();

// the __dirname is the current directory from where the script is running
app.use(express.static(`${__dirname}/dist`)); // eslint-disable-line

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.resolve(`${__dirname}/dist`, 'index.html')); // eslint-disable-line
});

app.listen(port);
