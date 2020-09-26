import express from "express";
const app = express();

app.use(express.static("build"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
