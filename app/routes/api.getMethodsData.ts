import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

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
  werte?: GetRate;
}

const getRequestTemplate = (method: Method, werte?: GetRate) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    method: method,
    params: {
      login: "test340534@t.de",
      pwd: "Albis1234",
      werte,
    },
    id: 1,
  }),
});

export const action: ActionFunction = async ({ request }) => {
  const data = await request.json();
  console.log("request action data", data);
  const { method, werte }: RequestBody = data;

  console.log("method - values - ", method, werte);

  try {
    const methodPromise = await fetch(
      `https://testschnittstelle.albis-leasing.de/Shop`,
      getRequestTemplate(method, werte),
    );

    if (!methodPromise.ok) {
      throw new Error(
        `HTTP error! status: ${methodPromise.status} for method: ${method}`,
      );
    }

    const methodData = await methodPromise.json();

    console.log(`$methodData - `, methodData);

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
