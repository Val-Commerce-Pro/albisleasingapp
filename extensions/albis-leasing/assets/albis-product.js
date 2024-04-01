async function addProductToCart() {
  const productId = document.getElementById("ah-product-id").textContent;
  const secureUrl = document.getElementById("ah-secure-url").textContent;

  let formData = {
    items: [
      {
        id: Number(productId),
        quantity: 1,
      },
    ],
  };
  const fetchUrl = `${secureUrl}/cart/add.js`;

  const response = await fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw new Error(`HTTP error: Status: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

document.addEventListener("DOMContentLoaded", async () => {
  // const secureUrl = document.getElementById("ah-secure-url").textContent;
  const addProductAndRedirect = document.getElementById(
    "addProductAndRedirect",
  );

  addProductAndRedirect.addEventListener("click", async (e) => {
    await addProductToCart();
  });
});
