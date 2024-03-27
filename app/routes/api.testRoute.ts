import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
// import { authenticate } from "~/shopify.server";

export const loader: LoaderFunction = async ({ request }) => {
  // const { admin, session } = await authenticate.admin(request);

  // const { rest, graphqlm } = admin;
  // const { onlineAccessInfo } = session;
  // if (!onlineAccessInfo) return;
  // const { associated_user } = onlineAccessInfo;
  // const { id } = associated_user;
  console.log("It works called");
  return json("It works", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
