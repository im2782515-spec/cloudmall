const express = require("express");
const app = express();

app.use(express.json());

app.use("/api/approve", require("./api/approve"));
app.use("/api/complete", require("./api/complete"));
app.use("/api/signin", require("./api/signin"));
app.use("/api/incomplete", require("./api/incomplete"));

app.listen(3000, ()=>console.log("Server running on port 3000"));
