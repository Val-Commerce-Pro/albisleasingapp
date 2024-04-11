import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  getMethodsData,
  type GetMethodsDataRequest,
} from "./utils/getMethodsData";

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
  try {
    const methodsPromise = await getMethodsData({
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
