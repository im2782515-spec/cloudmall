const axios = require("axios");

module.exports = async function(req,res){
  const payment = req.body.payment;
  try {
    await axios.post(
      `https://api.minepi.com/v2/payments/${payment.identifier}/complete`,
      {txid: payment.transaction.txid},
      { headers:{Authorization:`Key ${process.env.PI_API_KEY}`} }
    );
    res.json({message:`Handled incomplete ${payment.identifier}`});
  } catch(err){
    res.status(500).json({error: err.message});
  }
}
