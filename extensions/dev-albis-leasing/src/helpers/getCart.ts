import { useEffect, useState } from "react";

// interface CartData {
//   token: string;
//   // Define other cart properties you need
// }

export const CartInfo = () => {
  const [cartId, setCartId] = useState();

  useEffect(() => {
    fetch("/cart.js")
      .then((response) => response.json())
      .then((data) => {
        console.log("cart data", data);
        setCartId(data.token);
      })
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  return cartId;
};
