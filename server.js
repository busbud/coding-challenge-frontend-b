const express = require('express');


const app = express();
const port = process.env.PORT || 8080;
app.use(express.static('./dist/busbud'));
app.get('/*', function(req, res) {
    res.sendFile('index.html', { root: 'dist/busbud/' });
});
app.listen(port);