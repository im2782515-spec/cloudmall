Pi.init({ version: "2.0" });

async function login() {
  try {
    const auth = await Pi.authenticate(["username","payments"]);
    
    await fetch("/api/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(auth)
    });

    alert("login success");
  } catch (e) {
    console.log(e);
  }
}

async function pay() {
  Pi.createPayment(
    { amount: 1, memo: "dictionary payment", metadata: {} },
    {
      onReadyForServerApproval: async paymentId => {
        await fetch("/api/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId })
        });
      },

      onReadyForServerCompletion: async paymentId => {
        await fetch("/api/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId })
        });
      },

      onCancel: paymentId => {
        fetch("/api/incomplete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ paymentId })
        });
      },

      onError: error => console.log(error)
    }
  );
}
