import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { GetStelleAntrag } from "./types/methods";
import type { GetMethodsDataRequest } from "./utils/getAlbisMethodsData";
import { getAlbisMethodsData } from "./utils/getAlbisMethodsData";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { shop, antragsdaten }: GetMethodsDataRequest = data;
  // console.log("api.createAlbisAppAndDraftOrder", data);
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

    const getAntragDetailsData = await getAlbisMethodsData({
      method: "getAntragDetails",
      shop,
      antragnr: getStelleAntragData.result,
    });
    console.log("getAntragDetailsData", getAntragDetailsData);

    // const useful = {
    //   antragnr: getAntragDetailsData.result.antragnr,
    //   kaufpreis: getAntragDetailsData.result.kaufpreis,
    //   ln_name: getAntragDetailsData.result.ln_name,
    //   ln_telefon: getAntragDetailsData.result.ln_telefon,
    //   ln_mobil: getAntragDetailsData.result.ln_mobil,
    //   ln_email: getAntragDetailsData.result.ln_email,
    // };

    // console.log("useful", useful);
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
