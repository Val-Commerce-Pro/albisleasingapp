import { useEffect, useState } from "react";

export const useGetCart = () => {
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
