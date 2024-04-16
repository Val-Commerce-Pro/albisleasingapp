import { MockAntragsdaten } from "../mockData/mockData";

export interface LineItem {
  variantId: string;
  quantity: number;
}

export const createAlbisAppAndDraftOrder = async (
  antragsdaten: MockAntragsdaten,
  lineItem: LineItem[],
) => {
  try {
    // const shop = document.getElementById("shopDomain")?.textContent;
    const shop = "commerce-albis-leasing.myshopify.com";
    const body = JSON.stringify({
      shop,
      antragsdaten,
      lineItem,
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
