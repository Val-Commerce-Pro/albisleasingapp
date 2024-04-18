import type { AntragDetails } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createAntragDetails } from "~/models/antragDetails";
import { createDbShopifyOrder } from "~/models/createDbShopifyOrder";
import type { AntragDetailsData } from "~/models/types";
import { completeDraftOrder } from "./shopify/graphql/completeDraftOrder";
import type { DraftOrderInput } from "./shopify/graphql/createDraftOrder";
import { createDraftOrder } from "./shopify/graphql/createDraftOrder";
import type { CreateAlbisAppAndOrder } from "./types/createAlbisAppAndOrder";
import type {
  GetAntragDetails,
  GetStelleAntrag,
  JsonRpcErrorResponse,
} from "./types/methods";
import { isJsonRpcErrorResponse } from "./utils/formatData";
import { getAlbisMethodsData } from "./utils/getAlbisMethodsData";

type DraftOrderResponse = {
  draftOrderCreate: {
    draftOrder: {
      id: string;
    };
  };
};
type CompleteDraftOrderResponse = {
  draftOrderComplete: {
    draftOrder: {
      id: string;
      order: {
        id: string;
      };
    };
  };
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { shop, antragsdaten, lineItems }: CreateAlbisAppAndOrder = data;
  try {
    const getStelleAntragData: GetStelleAntrag | JsonRpcErrorResponse =
      await getAlbisMethodsData({
        method: "stelleAntrag",
        shop,
        antragsdaten,
      });

    console.log("getStelleAntragData", getStelleAntragData);
    if (isJsonRpcErrorResponse(getStelleAntragData)) {
      console.error("RPC Error:", getStelleAntragData);
      return json(getStelleAntragData, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const getAntragDetailsData: GetAntragDetails = await getAlbisMethodsData({
      method: "getAntragDetails",
      shop,
      antragnr: getStelleAntragData.result,
    });

    const { result } = getAntragDetailsData;

    const antragnrDetails: AntragDetailsData = {
      antragnr: result.antragnr,
      kaufpreis: result.kaufpreis,
      eingegangen: result.eingegangen,
      ln_name: result.ln_name,
      ln_telefon: result.ln_telefon,
      ln_mobil: result.ln_mobil,
      ln_email: result.ln_email,
      gf_name: result.gf_name,
      gf_vname: result.gf_vname,
    };
    const antragnrData: AntragDetails | null =
      await createAntragDetails(antragnrDetails);

    if (!antragnrData) {
      return new Response("Error ao Criar Antragnr", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const input: DraftOrderInput = {
      note: `Albis Request Status: ${result.status_txt}`,
      email: result.ln_email,
      phone: result.ln_telefon,
      tags: "Albis Leasing",
      taxExempt: true,
      // visibleToCustomer: true,
      billingAddress: {
        address1: result.ln_strasse,
        city: result.ln_ort,
        zip: result.ln_plz,
        countryCode: "DE",
      },
      shippingAddress: {
        address1: result.ln_strasse,
        city: result.ln_ort,
        zip: result.ln_plz,
        countryCode: "DE",
      },
      customAttributes: [{ key: "name", value: result.gf_nname }],
      lineItems: lineItems,
    };

    const draftOrderResponse = await createDraftOrder(shop, input);
    if (!draftOrderResponse) {
      return json(draftOrderResponse, {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const { data: draftOrderData }: { data?: DraftOrderResponse } =
      draftOrderResponse;
    console.log("DraftOrderResponse data", draftOrderData);
    const completeOrderResponse = await completeDraftOrder(
      shop,
      draftOrderData?.draftOrderCreate.draftOrder.id,
    );
    const {
      data: CompleteDraftOrderData,
    }: { data?: CompleteDraftOrderResponse } = completeOrderResponse;
    console.log("completeOrderResponse", completeOrderResponse);

    const test = await createDbShopifyOrder(antragnrData.id, {
      draftOrderId: draftOrderData?.draftOrderCreate.draftOrder.id ?? "",
      orderId:
        CompleteDraftOrderData?.draftOrderComplete.draftOrder.order.id ?? "",
    });
    console.log("SHopifyOrders saved into the BD", test);

    return json(getAntragDetailsData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
