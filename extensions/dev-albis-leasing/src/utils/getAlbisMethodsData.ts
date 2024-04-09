import { Werte } from "../types/localStorage";

export const getAlbisMethodsData = async (method: string, werte?: Werte) => {
  try {
    // const shop = document.getElementById("shopDomain")?.textContent;
    const shop = "commerce-albis-leasing.myshopify.com";
    const requestBody = werte ? { method, shop, werte } : { method, shop };
    const response = await fetch(
      `https://albisleasingapp.cpro-server.de/api/getMethodsData`,
      {
        method: "POST",
        body: JSON.stringify(requestBody),
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
