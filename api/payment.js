export default function handler(req, res) {

if(req.method === "POST"){
    
console.log("Payment received");

res.status(200).json({message:"ok"});

}

}
