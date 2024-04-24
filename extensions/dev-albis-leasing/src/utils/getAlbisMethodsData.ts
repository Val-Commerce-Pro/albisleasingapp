import { MockAntragsdaten } from "../mockData/mockData";
import { Werte } from "../types/albisMethods";
import { baseServerUrl } from "./urls";

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
    const response = await fetch(`${baseServerUrl}/api/getMethodsData`, {
      method: "POST",
      body,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};
