import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  getAlbisMethodsData,
  type GetMethodsDataRequest,
} from "./utils/getAlbisMethodsData";

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const {
    method,
    credentials,
    werte,
    shop,
    antragsdaten,
    antragnr,
  }: GetMethodsDataRequest = data;
  console.log("getMethodsBodyData", data);
  try {
    const methodsPromise = await getAlbisMethodsData({
      method,
      credentials,
      werte,
      shop,
      antragsdaten,
      antragnr,
    });
    if (!methodsPromise.ok) {
      throw new Error(
        `HTTP error! status: ${methodsPromise.status} for method: ${method}`,
      );
    }
    const methodsData = await methodsPromise.json();
    console.log("methodsData - getMethodsData Route - ", methodsData);
    return json(methodsData, {
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
