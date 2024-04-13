type UpdateCartDataProps = {
  [itemId: number | string]: number;
};

export const updateCartData = async (updates: UpdateCartDataProps) => {
  const updateCartPromise = await fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updates }),
  });
  const updateCartData = await updateCartPromise.json();
  return updateCartData;
};

export const deleteCartItem = async (updates: UpdateCartDataProps) => {
  const updateCartPromise = await fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updates }),
  });
  const updateCartData = await updateCartPromise.json();
  return updateCartData;
};
