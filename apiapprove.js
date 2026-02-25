const axios = require("axios");

module.exports = async function(req,res){
  const paymentId = req.body.paymentId;
  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/approve`,
      {},
      { headers:{Authorization:`Key ${process.env.PI_API_KEY}`} }
    );
    res.json({message:`Approved ${paymentId}`});
  } catch(err){
    res.status(500).json({error: err.message});
  }
}
