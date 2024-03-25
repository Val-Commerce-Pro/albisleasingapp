import { ping } from "./albis-items-cart";

function handleCalculator() {
  const financingAmount = document.getElementById("financingAmount");
  const localStorageData = JSON.parse(localStorage.getItem("cp@albisLeasing"));
  console.log("localStorageData", localStorageData);

  if (localStorageData) {
    const { totalCartValue } = localStorageData;
    financingAmount.value = totalCartValue ?? "";
  }

  const propertyInsurance = document.getElementById("propertyInsurance");
  const downPayment = document.getElementById("downPayment");
  const paymentMethod = document.getElementById("paymentMethod");
  // const totalCartValue = document
  //   .getElementById("totalCartValue")
  //   .textContent.slice(5);

  financingAmount.addEventListener("blur", function () {
    console.log("Input financingAmount value changed to: ", this.value);
    // Here, you can also update localStorage or perform other actions
  });

  downPayment.addEventListener("blur", function () {
    console.log("Input downPayment value changed to: ", this.value);
    // Here, you can also update localStorage or perform other actions
  });

  paymentMethod.addEventListener("change", function () {
    console.log("Select propertyInsurance value changed to: ", this.value);
    // Similarly, update localStorage or other actions can be performed here
  });
  propertyInsurance.addEventListener("change", function () {
    console.log("Select paymentMethod value changed to: ", this.value);
    // Similarly, update localStorage or other actions can be performed here
  });

  // if (localStorageData) {
  //   localStorage.setItem(
  //     "cp@albisLeasing",
  //     JSON.stringify({ ...localStorageData, totalCartValue }),
  //   );
  // } else {
  //   localStorage.setItem("cp@albisLeasing", JSON.stringify({ totalCartValue }));
  // }

  // const formValues = {
  //   propertyInsurance,
  //   financingAmount,
  //   downPayment,
  //   paymentMethod,
  // };
  // localStorage.setItem('formValues', JSON.stringify(formValues));

  // document.getElementById('propertyInsurance').value = formValues.propertyInsurance;
  // document.getElementById('financingAmount').value = formValues.financingAmount;
  // document.getElementById('downPayment').value = formValues.downPayment;
  // document.getElementById('paymentMethod').value = formValues.paymentMethod;
}

document.addEventListener("DOMContentLoaded", async () => {
  handleCalculator();
  ping();
});
