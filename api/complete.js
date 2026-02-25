const axios = require("axios");

module.exports = async function(req,res){
  const {paymentId, txid} = req.body;
  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${paymentId}/complete`,
      {txid},
      { headers:{Authorization:`Key ${process.env.PI_API_KEY}`} }
    );
    res.json({message:`Completed ${paymentId}`});
  } catch(err){
    res.status(500).json({error: err.message});
  }
}
