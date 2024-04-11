import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { GetAntragDetails, GetStelleAntrag } from "./types/methods";
import type { GetMethodsDataRequest } from "./utils/getAlbisMethodsData";
import { getAlbisMethodsData } from "./utils/getAlbisMethodsData";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { method, shop, antragsdaten }: GetMethodsDataRequest = data;
  try {
    const getStelleAntragPromise = await getAlbisMethodsData({
      method,
      shop,
      antragsdaten,
    });

    if (!getStelleAntragPromise.ok) {
      throw new Error(
        `HTTP error! status: ${getStelleAntragPromise.status} for method: ${method}`,
      );
    }
    const getStelleAntragData: GetStelleAntrag =
      await getStelleAntragPromise.json();
    console.log("getStelleAntragData", getStelleAntragData);

    const getAntragDetailsPromise = await getAlbisMethodsData({
      method: "getAntragDetails",
      shop,
      antragnr: getStelleAntragData.result,
    });

    if (!getAntragDetailsPromise.ok) {
      throw new Error(
        `HTTP error! status: ${getAntragDetailsPromise.status} for method: ${method}`,
      );
    }
    const getAntragDetailsData: GetAntragDetails =
      await getStelleAntragPromise.json();
    console.log("getAntragDetailsData", getAntragDetailsData);

    const useful = {
      antragnr: getAntragDetailsData.result.antragnr,
      kaufpreis: getAntragDetailsData.result.kaufpreis,
      ln_name: getAntragDetailsData.result.ln_name,
      ln_telefon: getAntragDetailsData.result.ln_telefon,
      ln_mobil: getAntragDetailsData.result.ln_mobil,
      ln_email: getAntragDetailsData.result.ln_email,
    };

    console.log("useful", useful);
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
