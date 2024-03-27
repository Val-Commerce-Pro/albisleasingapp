import type { ActionFunctionArgs } from "@remix-run/node";
import db from "../db.server";
import { authenticate } from "../shopify.server";
import { webhook_createdCart } from "./shopify/webhook/createdCart";
import { webhook_updatedCart } from "./shopify/webhook/updatedCart";

export const action = async ({ request }: ActionFunctionArgs) => {
  const { topic, shop, session, admin, payload } =
    await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      break;
    case "CARTS_CREATE":
      webhook_createdCart(shop, payload);
      return new Response("webhook Create Cart", { status: 200 });
    case "CARTS_UPDATE":
      webhook_updatedCart(shop, payload);
      return new Response("webhook Update Cart", { status: 200 });
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
