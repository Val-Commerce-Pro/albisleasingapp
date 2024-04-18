import type { AntragDetails, ShopifyOrders } from "@prisma/client";
import db from "../db.server";

export async function createDbShopifyOrder(
  antragDataId: AntragDetails["id"],
  orders: Pick<ShopifyOrders, "draftOrderId" | "orderId">,
) {
  try {
    const dbShopifyOrdersData = await db.shopifyOrders.create({
      data: {
        orderId: orders.orderId,
        draftOrderId: orders.draftOrderId,
        antragDetails: {
          connect: { id: antragDataId },
        },
      },
    });
    return dbShopifyOrdersData;
  } catch (error) {
    console.error("create dbShopifyOrders failed", error);
    return null;
  }
}
