import type {
  GetProduktgruppen,
  GetVertragsarten,
  GetZahlungsweisen,
} from "../types/methods";
import { baseServerUrl } from "./urls";

const getMethodsData = async (method: string) => {
  try {
    const requestBody = { method };
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

export const getAllMethodData = async () => {
  const [zahlungsweisen, produktgruppen, vertragsarten]: [
    GetZahlungsweisen,
    GetProduktgruppen,
    GetVertragsarten,
  ] = await Promise.all([
    getMethodsData("getZahlungsweisen"),
    getMethodsData("getProduktgruppen"),
    getMethodsData("getVertragsarten"),
  ]);

  return { zahlungsweisen, produktgruppen, vertragsarten };
};
