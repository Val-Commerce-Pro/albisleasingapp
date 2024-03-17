import db from "../db.server";
import { getModulAktiv } from "./modulAktiv.server";
import type { ModulZugangsdatenServer } from "./types";

export async function createModulZugangsdaten(
  shop: string,
  modulZugangsdaten: ModulZugangsdatenServer,
) {
  try {
    const modulAktivData = await getModulAktiv(shop);
    if (!modulAktivData) return console.error("Modul Aktiv not found");

    const modulZugangsdatenData = await db.modulZugangsdaten.create({
      data: {
        ...modulZugangsdaten,
        modulAktiv: {
          connect: { id: modulAktivData.id },
        },
      },
    });
    return modulZugangsdatenData;
  } catch (error) {
    console.error("Create ModulZugangsdaten failed", error);
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
    if (!modulAktivData) return console.error("Modul Aktiv not found");

    return { ...modulAktivData.ModulZugangsdaten };
  } catch (error) {
    console.error("Create Zugangsdaten failed", error);
  }
}

export async function updateModulZugangsdaten(
  shop: string,
  modulZugangsdaten: ModulZugangsdatenServer,
) {
  try {
    const data = await getModulZugangsdaten(shop);
    if (!data) return console.error("Modul Zugangsdaten not found");

    const updatedData = await db.modulZugangsdaten.update({
      where: { id: data.id },
      data: { ...modulZugangsdaten },
    });
    return updatedData;
  } catch (error) {
    console.error("Update Zugangsdaten failed", error);
  }
}
