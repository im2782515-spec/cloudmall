Pi.init({ version: "2.0", sandbox: true });

let user = null;

async function login(){

const scopes = ['username','payments'];

user = await Pi.authenticate(scopes, function(payment){
console.log(payment);
});

alert("Welcome " + user.user.username);

}

function searchWord(){

const word = document.getElementById("word").value;

const dictionary = {
hello:"مرحبا",
book:"كتاب",
car:"سيارة",
computer:"كمبيوتر",
language:"لغة"
};

const result = dictionary[word.toLowerCase()] || "Word not found";

document.getElementById("result").innerText = result;

}

function pay(){

const paymentData = {
amount:0.1,
memo:"Unlock Dictionary",
metadata:{ type:"dictionary" }
};

Pi.createPayment(paymentData,{

onReadyForServerApproval: function(paymentId){

fetch("/api/approve",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({paymentId})
});

},

onReadyForServerCompletion: function(paymentId,txid){

fetch("/api/complete",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({paymentId,txid})
});

document.getElementById("dictionary").style.display="block";

alert("Payment successful ✅");

},

onCancel: function(paymentId){
alert("Payment cancelled");
},

onError: function(error){
console.error(error);
}

});

}
