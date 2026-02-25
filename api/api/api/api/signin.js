const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req,res)=>{
  const authResult = req.body.authResult;
  const me = await axios.get(
    https://api.minepi.com/v2/me,
    { headers:{Authorization:Bearer ${authResult.user.accessToken}} }
  );
  res.json({message:"User signed in", me: me.data});
});

module.exports = router;
