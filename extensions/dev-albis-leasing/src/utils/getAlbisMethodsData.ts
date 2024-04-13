import { MockAntragsdaten } from "../mockData/mockData";
import { Werte } from "../types/albisMethods";

export const getAlbisMethodsData = async (
  method: string,
  werte?: Werte,
  antragsdaten?: MockAntragsdaten,
  antragnr?: number,
) => {
  try {
    // const shop = document.getElementById("shopDomain")?.textContent;
    const shop = "commerce-albis-leasing.myshopify.com";
    const body = JSON.stringify({
      method,
      shop,
      werte,
      antragsdaten,
      antragnr,
    });

    console.log("reuest body", body);
    const response = await fetch(
      `https://albisleasingapp.cpro-server.de/api/getMethodsData`,
      {
        method: "POST",
        body,
      },
    );
    console.log("response form methodsData", response);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};
