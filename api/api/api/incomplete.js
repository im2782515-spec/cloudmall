export default async function handler(req,res){
  const payment = req.body.payment;
  // تحقق من الدفع على البلوكتشين إذا مطلوب
  await axios.post(`/v2/payments/${payment.identifier}/complete`, {txid: payment.transaction.txid}, { headers:{Authorization:`Key ${process.env.PI_API_KEY}`} });
  res.status(200).json({message:`Handled incomplete ${payment.identifier}`});
}
