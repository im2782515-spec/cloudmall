export default async function handler(req,res){
  const paymentId = req.body.paymentId;
  await axios.post(`https://api.minepi.com/v2/payments/${paymentId}/approve`, {}, { headers:{Authorization:`Key ${process.env.PI_API_KEY}`} });
  res.status(200).json({message:`Approved ${paymentId}`});
}
