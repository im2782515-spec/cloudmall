const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// api routes
app.post("/api/signin", require("./api/signin"));
app.post("/api/approve", require("./api/approve"));
app.post("/api/complete", require("./api/complete"));
app.post("/api/incomplete", require("./api/incomplete"));

// frontend
app.use(express.static(path.join(__dirname,"frontend")));

app.listen(3000,()=>console.log("Server running on port 3000"));
