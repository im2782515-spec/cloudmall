let currentUser = null;

async function login() {
  const scopes = ["username", "payments"];
  const auth = await Pi.authenticate(scopes, onIncompletePaymentFound);
  await signInUser(auth);
  currentUser = auth.user;
  document.getElementById("user").innerText = "مرحبا " + currentUser.username;
}
function pay() {
  if (!currentUser) { alert("سجل دخول الاول"); return; }
  const paymentData = { amount:1, memo:"Unlock dictionary", metadata:{item:"dictionary"} };
  const callbacks = { onReadyForServerApproval, onReadyForServerCompletion, onCancel, onError };
  Pi.createPayment(paymentData, callbacks);
}async function find() {
  const word = document.getElementById("search").value.trim();
  const snap = await db.collection("dictionary").where("word","==",word).get();
  if(snap.empty) { document.getElementById("result").innerText="الكلمة غير موجودة"; }
  else { snap.forEach(doc => document.getElementById("result").innerText = doc.data().meaning); }
}
// 1. الموافقة على السيرفر
const onReadyForServerApproval = async (paymentId) => {
  await fetch("/api/approve", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId}) });
};

// 2. إكمال الدفع
const onReadyForServerCompletion = (paymentId, txid) => {
  fetch("/api/complete", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({paymentId, txid}) });
  document.getElementById("search").disabled = false;
  document.getElementById("searchBtn").disabled = false;
  alert("الدفع تم! يمكنك الآن البحث في القاموس");
};

// 3. الدفع ملغى
const onCancel = (paymentId) => { alert("تم الغاء الدفع"); };

// 4. خطأ في الدفع
const onError = (error) => { console.log("Error", error); };

// 5. دفع غير مكتمل
const onIncompletePaymentFound = (payment) => {
  fetch("/api/incomplete", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({payment}) });
};
