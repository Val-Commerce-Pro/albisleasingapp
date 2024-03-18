import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
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
  credentials: ModulZugangsdatenData;
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
      login: template.credentials.username,
      pwd: template.credentials.password,
      werte: template?.werte,
    },
    id: 1,
  }),
});

export const action: ActionFunction = async ({ request }) => {
  //check for credentials into the database
  // if does not
  // throw new Response("Credentials not found!", {
  //   status: 404,
  // });
  const data = await request.json();
  // console.log("request action data", data);
  const { method, credentials, werte }: RequestBody = data;

  // console.log("method - values - ", method, werte);

  try {
    const methodPromise = await fetch(
      credentials.apiLink,
      getRequestTemplate({ method, credentials, werte }),
    );

    if (!methodPromise.ok) {
      throw new Error(
        `HTTP error! status: ${methodPromise.status} for method: ${method}`,
      );
    }

    const methodData = await methodPromise.json();

    // console.log(`$methodData - `, methodData);

    return json(methodData, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Response("Internal Server Error", {
      status: 500,
    });
  }
};
