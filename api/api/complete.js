const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req,res)=>{
  const {paymentId, txid} = req.body;
  await axios.post(
    https://api.minepi.com/v2/payments/${paymentId}/complete,
    {txid},
    { headers:{Authorization:Key ${process.env.PI_API_KEY}} }
  );
  res.json({message:Completed ${paymentId}});
});

module.exports = router;
