var fallback = require('express-history-api-fallback');
var express = require('express');
var app = express();
var root = __dirname;
app.use(express.static(root));
app.use(fallback('index.html', { root: root }));

app.listen(process.env.PORT || 8080, function (err) {
        if (err) { console.log(err) }
        console.log('Listening at localhost:8080');
});

