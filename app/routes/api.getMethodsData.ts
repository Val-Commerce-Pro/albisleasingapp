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
  const methods: Method[] = [
    "getZahlungsweisen",
    "getProduktgruppen",
    "getVertragsarten",
    "getRechtsformen",
  ];

  try {
    const fetchDataPromises = methods.map((method) =>
      fetch(endPoint, getRequestTemplate(method)).then((response) => {
        console.log(`${method} response`, response);
        if (!response.ok) {
          throw new Error(
            `HTTP error! status: ${response.status} for method: ${method}`,
          );
        }
        return response.json().then((data) => ({ method, data }));
      }),
    );
    console.log(`$fetchDataPromises - `, fetchDataPromises);

    const results = await Promise.all(fetchDataPromises);

    console.log(`$results - `, results);

    return json(results, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    // Handle errors, e.g., by returning a specific error response
    throw new Response("Internal Server Error", {
      status: 500,
    });
  }
};
