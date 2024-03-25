// alert("HELLO ALBIS LEASING REQUEST")

function Testing() {
  const test = JSON.parse(localStorage.getItem("cp@albisLeasing"));
  console.log("localStora getItem", test);
}

document.addEventListener("DOMContentLoaded", async () => {
  Testing();
});

function calculateLeasing(e) {
  // Get values from the form
  const insurance = document.getElementById("propertyInsurance").value;
  const financingAmount = document.getElementById("financingAmount").value;
  const downPayment = document.getElementById("downPayment").value;
  const paymentMethod = document.getElementById("paymentMethod").value;
  const calcBtn = document.getElementById("calculatorBtn");
  const testBackend = document.getElementById("test-backend");

  const testBtn = document.getElementById("testBtn");

  testBtn.addEventListener("click", (e) => {
    console.log("testBtn");
  });

  calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(
      "e, insurance, financingAmount, downPayment, paymentMethod",
      e,
      insurance,
      financingAmount,
      downPayment,
      paymentMethod,
    );
  });

  testBackend.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("WOrks");
  });

  // fetch(url, {
  //   method: "POST", // Specify the method
  //   headers: {
  //     "Content-Type": "application/json", // Specify the content type
  //     // Add other headers as needed
  //   },
  //   body: JSON.stringify(data), // Convert the JavaScript object to a JSON string
  // })
  //   .then((response) => response.json()) // Parse the JSON response
  //   .then((data) => {
  //     console.log("Success:", data);
  //   })
  //   .catch((error) => {
  //     console.error("Error:", error);
  //   });
}
