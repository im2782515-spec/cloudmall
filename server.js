const express = require("express");
const app = express();

app.use(express.json());

// استيراد ملفات api
app.post("/api/approve", require("./api/approve"));
app.post("/api/complete", require("./api/complete"));
app.post("/api/signin", require("./api/signin"));
app.post("/api/incomplete", require("./api/incomplete"));

app.listen(3000, () => console.log("Server running on port 3000"));
