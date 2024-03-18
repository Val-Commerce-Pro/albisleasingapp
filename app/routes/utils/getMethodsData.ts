import type {
  GetProduktgruppen,
  GetVertragsarten,
  GetZahlungsweisen,
} from "../types/methods";
import type { ModulZugangsdatenData } from "../types/pluginConfigurator";
import { baseServerUrl } from "./urls";

const getMethodsData = async (
  method: string,
  credentials: ModulZugangsdatenData,
) => {
  try {
    const requestBody = { method, credentials };
    const response = await fetch(`${baseServerUrl}/api/getMethodsData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching method data:", error);
    return null;
  }
};

export const getAllMethodData = async (credentials: ModulZugangsdatenData) => {
  const [zahlungsweisen, produktgruppen, vertragsarten]: [
    GetZahlungsweisen,
    GetProduktgruppen,
    GetVertragsarten,
  ] = await Promise.all([
    getMethodsData("getZahlungsweisen", credentials),
    getMethodsData("getProduktgruppen", credentials),
    getMethodsData("getVertragsarten", credentials),
  ]);

  return { zahlungsweisen, produktgruppen, vertragsarten };
};
