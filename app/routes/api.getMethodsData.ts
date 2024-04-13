import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
// import type { Antragsdaten, Method } from "./types/methods";
// import type { ModulZugangsdatenData } from "./types/pluginConfigurator";
import {
  getAlbisMethodsData,
  // getRequestTemplate,
  type GetMethodsDataRequest,
} from "./utils/getAlbisMethodsData";

// type GetRate = {
//   kaufpreis: string;
//   prodgrp: string;
//   mietsz: string;
//   vertragsart: string;
//   zahlweise: string;
// };
// export interface GetMethodsDataRequest {
//   method: Method;
//   credentials?: ModulZugangsdatenData;
//   shop?: string;
//   werte?: GetRate;
//   antragsdaten?: Antragsdaten;
//   antragnr?: number;
// }

// export const getRequestTemplate = (template: GetMethodsDataRequest) => {
//   const params = Object.entries(template).reduce(
//     (acc, [key, value]) => {
//       if (value !== undefined) {
//         acc[key] = value;
//       }
//       return acc;
//     },
//     {} as { [key: string]: unknown },
//   );

//   console.log("params", params);
//   return {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       jsonrpc: "2.0",
//       method: template.method,
//       params,
//       id: 1,
//     }),
//   };
// };
// const getRequestTemplate = (template: GetMethodsDataRequest) => {
//   const params = Object.entries(template).reduce(
//     (acc, [key, value]) => {
//       if (value !== undefined) {
//         acc[key] = value;
//       }
//       return acc;
//     },
//     {} as { [key: string]: unknown },
//   );

//   console.log("params", params);
//   return {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       jsonrpc: "2.0",
//       method: template.method,
//       params,
//       id: 1,
//     }),
//   };
// };

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
    // const pluginConfData = shop && (await getPluginConf(shop));
    // const requestCredentials =
    //   pluginConfData && pluginConfData.ModulZugangsdaten
    //     ? {
    //         apiLink: pluginConfData.ModulZugangsdaten.apiLink,
    //         benutzer: pluginConfData.ModulZugangsdaten.benutzer,
    //         passwort: pluginConfData.ModulZugangsdaten.passwort,
    //       }
    //     : credentials;

    // if (!requestCredentials) {
    //   return new Response("Invalid Credentials", {
    //     status: 404,
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   });
    // }

    // const methodsPromise = await fetch(
    //   requestCredentials.apiLink,
    //   getRequestTemplate({
    //     method,
    //     credentials: requestCredentials,
    //     werte,
    //     antragsdaten,
    //     antragnr,
    //   }),
    // );

    // if (!methodsPromise.ok) {
    //   return new Response(
    //     `HTTP error! status: ${methodsPromise.status} for method: ${method}`,
    //     {
    //       status: 404,
    //       headers: {
    //         "Access-Control-Allow-Origin": "*",
    //       },
    //     },
    //   );
    // }
    // const methodsData = await methodsPromise.json();

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
