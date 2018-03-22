const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.get('/api/hello', (req, res) => {
  res.send({ msg: 'Hello React, this is Express calling.' });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
