import express from 'express';
const app = express();

app.use(express.static('dist'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(process.env.PORT || 8080);
