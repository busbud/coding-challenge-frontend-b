const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}!`);
});
