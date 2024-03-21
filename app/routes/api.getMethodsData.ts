import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getPluginConf } from "~/models/methods.server";
import type { ModulZugangsdatenData } from "./types/pluginConfigurator";

type Method =
  | "getZahlungsweisen"
  | "getProduktgruppen"
  | "getVertragsarten"
  | "getRechtsformen";

type GetRate = {
  kaufpreis: string;
  prodgrp: string;
  mietsz: string;
  vertragsart: string;
  zahlweise: string;
};
interface RequestBody {
  method: Method;
  credentials?: ModulZugangsdatenData;
  shop?: string;
  werte?: GetRate;
}

const getRequestTemplate = (template: RequestBody) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: template.method,
    params: {
      login: template.credentials?.benutzer,
      pwd: template.credentials?.passwort,
      werte: template?.werte,
    },
    id: 1,
  }),
});

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  const { method, credentials, werte, shop }: RequestBody = data;

  try {
    const pluginConfData = shop && (await getPluginConf(shop));
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
      getRequestTemplate({ method, credentials: requestCredentials, werte }),
    );

    if (!methodsPromise.ok) {
      throw new Error(
        `HTTP error! status: ${methodsPromise.status} for method: ${method}`,
      );
    }
    const methodsData = await methodsPromise.json();

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
