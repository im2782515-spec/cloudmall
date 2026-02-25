const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req,res)=>{
  const payment = req.body.payment;

  await axios.post(
    https://api.minepi.com/v2/payments/${payment.identifier}/complete,
    {txid: payment.transaction.txid},
    { headers:{Authorization:Key ${process.env.PI_API_KEY}} }
  );

  res.json({message:Handled incomplete ${payment.identifier}});
});

module.exports = router;
