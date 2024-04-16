import { StelleAntrag } from "../types/albisMethods";

export const createAlbisAppAndDraftOrder = async (
  antragsdaten: StelleAntrag,
) => {
  try {
    // const shop = document.getElementById("shopDomain")?.textContent;
    const shop = "commerce-albis-leasing.myshopify.com";
    const body = JSON.stringify({
      shop,
      antragsdaten,
    });
    const response = await fetch(
      `https://albisleasingapp.cpro-server.de/api/createAlbisAppAndDraftOrder`,
      {
        method: "POST",
        body,
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
