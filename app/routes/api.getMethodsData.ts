import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

type Method =
  | "getZahlungsweisen"
  | "getProduktgruppen"
  | "getVertragsarten"
  | "getRechtsformen";

const endPoint = `https://testschnittstelle.albis-leasing.de/Shop`;

const getRequestTemplate = (method: Method) => ({
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
    },
    id: 1,
  }),
});

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request.url);
  const method = requestUrl.searchParams.get("method");
  console.log("method", method);

  try {
    const methodPromise = await fetch(
      endPoint,
      getRequestTemplate(method as Method),
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
