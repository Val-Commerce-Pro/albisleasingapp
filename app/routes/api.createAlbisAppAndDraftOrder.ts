import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createAntragDetails } from "~/models/antragDetails";
import type { AntragDetailsData } from "~/models/types";
import type { DraftOrderInput } from "./shopify/graphql/createDraftOrder";
import { createDraftOrder } from "./shopify/graphql/createDraftOrder";
import type { CreateAlbisAppAndOrder } from "./types/createAlbisAppAndOrder";
import type { GetAntragDetails, GetStelleAntrag } from "./types/methods";
import { getAlbisMethodsData } from "./utils/getAlbisMethodsData";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { shop, antragsdaten, lineItems }: CreateAlbisAppAndOrder = data;
  try {
    const getStelleAntragData: GetStelleAntrag = await getAlbisMethodsData({
      method: "stelleAntrag",
      shop,
      antragsdaten,
    });

    if (!getStelleAntragData.result) {
      return new Response("Invalid Credentials", {
        status: 404,
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
    console.log("getAntragDetailsData", getAntragDetailsData);

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
    await createAntragDetails(antragnrDetails);

    const input: DraftOrderInput = {
      note: `Albis Request Status: ${result.status_txt}`,
      email: result.ln_email,
      phone: result.ln_telefon,
      tags: "Albis Leasing",
      taxExempt: true,
      visibleToCustomer: true,
      billingAddress: {
        address1: result.ln_strasse,
        city: result.ln_ort,
        zip: result.ln_plz,
        countryCode: "DE",
      },
      customAttributes: [{ key: "name", value: result.gf_nname }],
      lineItems,
    };

    const testDrafOrder = await createDraftOrder(shop, input);
    console.log("testDrafOrder", testDrafOrder);

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
