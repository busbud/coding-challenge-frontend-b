const express = require("express");
const path = require("path");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "app/build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/app/build/index.html"));
});

const port = process.env.PORT || 1337;
app.listen(port);
