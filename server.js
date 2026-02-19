const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PI_API_KEY = "PUT_YOUR_PI_API_KEY_HERE";
const PI_API = "https://api.minepi.com/v2/payments";

app.post("/approve", async (req, res) => {
  const { paymentId } = req.body;

  try {
    await axios.post(
      `${PI_API}/${paymentId}/approve`,
      {},
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    res.send({ success: true });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.post("/complete", async (req, res) => {
  const { paymentId, txid } = req.body;

  try {
    await axios.post(
      `${PI_API}/${paymentId}/complete`,
      { txid },
      { headers: { Authorization: `Key ${PI_API_KEY}` } }
    );
    res.send({ success: true });
  } catch (e) {
    res.send({ error: e.message });
  }
});

app.listen(3000, () => console.log("Server running"));
