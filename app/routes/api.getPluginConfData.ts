import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getModulEinstellungen } from "~/models/modulEinstellungen";

export const loader: LoaderFunction = async ({ request }) => {
  const requestedURL = new URL(request.url);

  const shop = requestedURL.searchParams.get("shop");

  try {
    const pluginConfData = shop && (await getModulEinstellungen(shop));

    if (!pluginConfData) {
      return new Response("Invalid Credentials", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }

    return json(pluginConfData, {
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
