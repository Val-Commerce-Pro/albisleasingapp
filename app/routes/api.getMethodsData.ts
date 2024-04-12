import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPluginConf } from "~/models/methods.server";
import {
  // getAlbisMethodsData,
  getRequestTemplate,
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
    const pluginConfData = !credentials && shop && (await getPluginConf(shop));
    const requestCredentials =
      pluginConfData && pluginConfData.ModulZugangsdaten
        ? {
            apiLink: pluginConfData.ModulZugangsdaten.apiLink,
            benutzer: pluginConfData.ModulZugangsdaten.benutzer,
            passwort: pluginConfData.ModulZugangsdaten.passwort,
          }
        : credentials;

    if (!requestCredentials) {
      return new Response("Invalid Credentials", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    const methodsPromise = await fetch(
      requestCredentials.apiLink,
      getRequestTemplate({
        method,
        credentials: requestCredentials,
        werte,
        antragsdaten,
        antragnr,
      }),
    );

    console.log("methodsPromise", methodsPromise);

    if (methodsPromise.ok) {
      return new Response(
        `HTTP error! status: ${methodsPromise.status} for method: ${method}`,
        {
          status: 404,
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }
    const methodsData = await methodsPromise.json();

    // const methodsPromise = await getAlbisMethodsData({
    //   method,
    //   credentials,
    //   werte,
    //   shop,
    //   antragsdaten,
    //   antragnr,
    // });
    // if (!methodsPromise.ok) {
    //   throw new Error(
    //     `HTTP error! status: ${methodsPromise.status} for method: ${method}`,
    //   );
    // }
    // const methodsData = await methodsPromise.json();
    // console.log("methodsData - getMethodsData Route - ", methodsData);

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
