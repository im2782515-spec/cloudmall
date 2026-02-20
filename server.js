const express = require("express");
const app = express();

app.use(express.json());

app.post("/approve", (req, res) => {
  res.json({ approved: true });
});

app.post("/complete", (req, res) => {
  res.json({ completed: true });
});

app.listen(3000, () => console.log("server running"));
