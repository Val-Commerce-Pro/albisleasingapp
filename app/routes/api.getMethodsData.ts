import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

type Methods =
  | "getZahlungsweisen"
  | "getProduktgruppen"
  | "getVertragsarten"
  | "getRechtsformen";

export const loader: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);

  const getZahlungsweisen = requestedURL.searchParams.get("getZahlungsweisen");
  const getProduktgruppen = requestedURL.searchParams.get("getProduktgruppen");
  const getVertragsarten = requestedURL.searchParams.get("getVertragsarten");
  const getRechtsformen = requestedURL.searchParams.get("getRechtsformen");

  if (
    !getZahlungsweisen ||
    !getProduktgruppen ||
    !getVertragsarten ||
    !getRechtsformen
  ) {
    throw new Response("Bad Request", {
      status: 400,
    });
  }
  const methodsList: string[] = [
    getProduktgruppen,
    getVertragsarten,
    getRechtsformen,
    getZahlungsweisen,
  ];

  const endPoint = `https://testschnittstelle.albis-leasing.de/Shop`;

  const getRequestTemplate = (requestMethod: Methods) => {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: requestMethod,
        params: {
          login: "test340534@t.de",
          pwd: "Albis1234",
        },
        id: 1,
      }),
    };
  };

  for (const method of methodsList) {
    try {
      const response = await fetch(
        endPoint,
        getRequestTemplate(method as Methods),
      );
      console.log(`${method} response`, response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log(`${method} data`, data);
      return data;
    } catch (error) {
      console.error(`Error fetching ${method}:`, error);
    }
  }

  return json("It's work", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
