// import type { AntragDetails } from "@prisma/client";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { updateAntragDetails } from "~/models/antragDetails";
import { getShopifyOrders } from "~/models/createDbShopifyOrder";
import { addNoteToOrder } from "./shopify/graphql/addNoteToOrder";
// import type { GetAntragDetails, JsonRpcErrorResponse } from "./types/methods";
import { getCurrentFormattedTime } from "./utils/formatData";
// import { getAlbisMethodsData } from "./utils/getAlbisMethodsData";
import { checkAntragStatus } from "./utils/helpers";

// type CheckAntrageDetailsBody = {
//   shop: string;
//   antragnrData: AntragDetails;
// };

export const action: ActionFunction = async ({ request }) => {
  console.log("CheckADFAke route called");
  const antragnrData = {
    id: 1,
    jsonrpc: "2.0",
    result: {
      antragnr: 500765,
      objekt: "EDV EDV (Hard- und Software)",
      kaufpreis: 1625.0,
      mietsz: 0.0,
      laufzeit: 36,
      rate: 55.45,
      mail_an_ln: true,
      ln_name: "test company",
      ln_strasse: "test street",
      ln_plz: "20146",
      ln_ort: "Test Location",
      ln_telefon: "015231111111",
      ln_mobil: null,
      ln_fax: null,
      ln_email: "test@test.com",
      gf_name: "Test. AA Testing",
      gf_vname: "Test. AA",
      gf_nname: "Testing",
      gf_anrede_text: "Herr",
      gf_anrede: 1,
      gf_strasse: "test street",
      gf_plz: "20146",
      gf_ort: "Test Location",
      gf_gebdat: "2003-04-24",
      eingegangen: "2024-04-24 18:14:28",
      promotion_id: null,
      status: 52,
      status_txt: "in Bearbeitung",
      ln_rechtsform: 1,
      iban: "DE02120300000000202051",
      bic: "BYLADEM1001",
      prodgrp: 1,
      ssv: true,
      schlusszahlung: 330.67,
      vertragsart: 1,
      zahlweise: 1,
      provproz: 5.0,
      ta_rw_proz: null,
      referenz: null,
      restwert: 0.0,
      kuendbar_auf: 30,
      saleleaseback: false,
      vk_id: 75451,
      vertrag_an_ln: true,
      bankname: "Deutsche Kreditbank Berlin",
      entsch_dok: [],
      vertr_dok: [],
    },
  };
  const shop = "commerce-albis-leasing.myshopify.com";

  try {
    // const newAntragDetails: GetAntragDetails | JsonRpcErrorResponse =
    //   await getAlbisMethodsData({
    //     method: "getAntragDetails",
    //     shop,
    //     antragnr: antragnrData.antragnr,
    //   });

    // if (isJsonRpcErrorResponse(newAntragDetails)) {
    //   console.error("RPC Error AntragDetails:", newAntragDetails);
    //   return json(newAntragDetails, {
    //     headers: {
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   });
    // }
    const shopifyOrders = await getShopifyOrders(26);
    if (!shopifyOrders) {
      return new Response("Error processing shopify Orders Data", {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    const { result } = antragnrData;
    const statusData = checkAntragStatus(980, "abgerechnet");
    const checkDates = ["mock Data"];
    console.log("checkDates", checkDates);
    const newLastCheckAt = [...checkDates, getCurrentFormattedTime()];
    console.log("newLastCheckAt", newLastCheckAt);
    if (!statusData.isStatusFinish) {
      await updateAntragDetails({
        antragnr: result.antragnr,
        lastCheckAt: JSON.stringify(newLastCheckAt),
      });
      await addNoteToOrder(shop, shopifyOrders.orderId, statusData.statusNote);
      return json(
        {
          antragnr: result.antragnr,
          complete: false,
          currentStatus: result.status,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    const updatedAntragData = await updateAntragDetails({
      antragnr: result.antragnr,
      complete: true,
      eingegangen: result.eingegangen,
      gf_name: result.gf_name,
      gf_vname: result.gf_vname,
      kaufpreis: result.kaufpreis,
      ln_email: result.ln_email,
      ln_mobil: result.ln_mobil,
      ln_name: result.ln_name,
      ln_telefon: result.ln_telefon,
      status: 980,
      status_txt: "abgerechnet",
      lastCheckAt: JSON.stringify([...checkDates, getCurrentFormattedTime()]),
    });
    if (!updatedAntragData) {
      return new Response("Error processing updated Antrag Data", {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
    }
    console.log("newNote", statusData.statusNote);
    await addNoteToOrder(shop, shopifyOrders.orderId, statusData.statusNote);

    return json(
      {
        antragnr: result.antragnr,
        complete: true,
        currentStatus: result.status,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  } catch (error) {
    console.error("Error while processing AntragDetails", error);
    return new Response("Error processing requests", {
      status: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};
