export default async function handler(req,res){
  const authResult = req.body.authResult;
  const me = await axios.get(`https://api.minepi.com/v2/me`, { headers:{Authorization:`Bearer ${authResult.user.accessToken}`} });
  res.status(200).json({message:"User signed in", me});
}
