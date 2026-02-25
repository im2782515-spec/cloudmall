const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req,res)=>{
  const paymentId = req.body.paymentId;
  await axios.post(
    https://api.minepi.com/v2/payments/${paymentId}/approve,
    {},
    { headers:{Authorization:Key ${process.env.PI_API_KEY}} }
  );
  res.json({message:Approved ${paymentId}});
});

module.exports = router
