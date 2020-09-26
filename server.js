const express = require("express");
const app = express();

app.use(express.static(__dirname + "/build"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
