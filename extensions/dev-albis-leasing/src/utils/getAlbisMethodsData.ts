import { MockAntragsdaten } from "../mockData/mockData";
import { Werte } from "../types/albisMethods";

export const getAlbisMethodsData = async (
  method: string,
  werte?: Werte,
  antragsdaten?: MockAntragsdaten,
) => {
  try {
    if (werte && antragsdaten) return;
    // const shop = document.getElementById("shopDomain")?.textContent;
    const shop = "commerce-albis-leasing.myshopify.com";
    // const requestBody = werte
    //   ? { method, shop, werte }
    //   : antragsdaten
    //     ? { method, shop, antragsdaten }
    //     : { method, shop };
    const response = await fetch(
      `https://albisleasingapp.cpro-server.de/api/getMethodsData`,
      {
        method: "POST",
        body: JSON.stringify({ method, shop, werte, antragsdaten }),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AppConfig:", error);
  }
};
