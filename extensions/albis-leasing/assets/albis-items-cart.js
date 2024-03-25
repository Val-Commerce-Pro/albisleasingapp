function handleItemsCart() {
  const localStorageData = JSON.parse(localStorage.getItem("cp@albisLeasing"));

  const totalCartValue = document
    .getElementById("totalCartValue")
    .textContent.slice(5);

  if (localStorageData) {
    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageData, totalCartValue }),
    );
  } else {
    localStorage.setItem("cp@albisLeasing", JSON.stringify({ totalCartValue }));
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  handleItemsCart();
});
