import type { ModulZugangsdatenData } from "~/routes/types/pluginConfigurator";
import db from "../db.server";

async function createModulZugangsdaten(
  modulAktivId: number,
  modulZugangsdaten: ModulZugangsdatenData,
) {
  const newModulZugangsdaten = await db.modulZugangsdaten.create({
    data: {
      ...modulZugangsdaten,
      modulAktiv: {
        connect: { id: modulAktivId },
      },
    },
  });
  return newModulZugangsdaten;
}
async function updateModulZugangsdaten(
  modulAktivId: number,
  modulZugangsdaten: ModulZugangsdatenData,
) {
  try {
    console.log(
      "modulAktivId, modulZugangsdaten",
      modulAktivId,
      modulZugangsdaten,
    );
    const updatedData = await db.modulZugangsdaten.update({
      where: { id: modulAktivId },
      data: { ...modulZugangsdaten },
    });
    return updatedData;
  } catch (error) {
    console.error("Update Zugangsdaten failed", error);
  }
}

export async function updateOrCreateModulZugangsdaten(
  shop: string,
  modulZugangsdaten: ModulZugangsdatenData,
) {
  try {
    const data = await getModulZugangsdaten(shop);
    console.log("getModulZugangsdaten", data);
    if (!data) return null;

    const updatedData = await updateModulZugangsdaten(
      data.id,
      modulZugangsdaten,
    );
    console.log("ModulZugangsdaten updatedData", data);
    if (updatedData) return updatedData;

    const newModulZugangsdaten = await createModulZugangsdaten(
      data.id,
      modulZugangsdaten,
    );
    console.log("ModulZugangsdaten newModulZugangsdaten", newModulZugangsdaten);
    return newModulZugangsdaten;
  } catch (error) {
    console.error("Update Or Create ModulZugangsdaten failed", error);
  }
}

export async function getModulZugangsdaten(shop: string) {
  try {
    const modulAktivData = await db.modulAktiv.findUnique({
      where: { shop },
      include: {
        ModulZugangsdaten: true,
      },
    });
    return modulAktivData;
  } catch (error) {
    console.error("Get Zugangsdaten failed", error);
  }
}
