export async function webhook_createdCart(shop: string, payload: unknown) {
  console.log("cartCreate rended");

  console.log("cartCreate shop", shop);
  console.log("cartCreate payload", payload);
}
