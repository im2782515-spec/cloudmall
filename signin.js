const axios = require("axios");

module.exports = async function(req,res){
  const authResult = req.body.authResult;
  try {
    const me = await axios.get(
      `https://api.minepi.com/v2/me`,
      { headers:{Authorization:`Bearer ${authResult.user.accessToken}`} }
    );
    res.json({message:"User signed in", me: me.data});
  } catch(err){
    res.status(500).json({error: err.message});
  }
}
