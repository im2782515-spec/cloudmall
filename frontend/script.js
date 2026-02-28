Pi.init({version:"2.0",sandbox:false});

async function login(){
 const auth=await Pi.authenticate(["username","payments"]);
 await fetch("/api/signin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(auth)});
}

function pay(){
 Pi.createPayment(
  {amount:1,memo:"dictionary",metadata:{}},
  {
   onReadyForServerApproval:id=>{
    fetch("/api/approve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});
   },
   onReadyForServerCompletion:(id,tx)=>{
    fetch("/api/complete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,tx})});
   },
   onCancel:id=>{
    fetch("/api/incomplete",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id})});
   },
   onError:e=>console.log(e)
  }
 );
}
