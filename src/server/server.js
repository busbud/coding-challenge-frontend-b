const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// serve static files at /dist route from the dist folder
app.use('/dist', express.static('dist'));

// serve the html file when client hits the root route
app.get('/', (req, res) => {
  return res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

app.listen(port, () => console.log(`listening on port ${port}...`));
