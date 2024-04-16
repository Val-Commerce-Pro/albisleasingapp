import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { createAntragDetails } from "~/models/antragDetails";
import type { AntragDetailsData } from "~/models/types";
import { createDraftOrder } from "./shopify/graphql/createDraftOrder";
import type { GetAntragDetails, GetStelleAntrag } from "./types/methods";
import type { GetMethodsDataRequest } from "./utils/getAlbisMethodsData";
import { getAlbisMethodsData } from "./utils/getAlbisMethodsData";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { shop, antragsdaten }: GetMethodsDataRequest = data;
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

    const antragnrDetails: AntragDetailsData = {
      antragnr: getAntragDetailsData.result.antragnr,
      kaufpreis: getAntragDetailsData.result.kaufpreis,
      eingegangen: getAntragDetailsData.result.eingegangen,
      ln_name: getAntragDetailsData.result.ln_name,
      ln_telefon: getAntragDetailsData.result.ln_telefon,
      ln_mobil: getAntragDetailsData.result.ln_mobil,
      ln_email: getAntragDetailsData.result.ln_email,
      gf_name: getAntragDetailsData.result.gf_name,
      gf_vname: getAntragDetailsData.result.gf_vname,
    };
    await createAntragDetails(antragnrDetails);

    // const input = {
    //   customerId: "",
    //   note: getAntragDetailsData.result.status_txt,
    // };

    const testDrafOrder = createDraftOrder(shop ?? "");
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
