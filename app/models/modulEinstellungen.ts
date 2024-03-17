import db from "../db.server";
import { getModulZugangsdaten } from "./modulZugangsdaten";
import type { ModulEinstellungenServer } from "./types";

export async function createModulEinstellungen(
  shop: string,
  modulEinstellungen: ModulEinstellungenServer,
) {
  try {
    const modulZugangsdatenData = await getModulZugangsdaten(shop);
    if (!modulZugangsdatenData || modulZugangsdatenData.id)
      return console.error("Modul Einstellungen not found");

    const modulEinstellungenData = await db.modulEinstellungen.create({
      data: {
        ...modulEinstellungen,
        zugangsdaten: {
          connect: { id: modulZugangsdatenData.id },
        },
      },
    });
    return modulEinstellungenData;
  } catch (error) {
    console.error("Create Modul Einstellungen failed", error);
  }
}

export async function getModulEinstellungen(shop: string) {
  try {
    const modulAktivData = await db.modulAktiv.findUnique({
      where: { shop },
      include: {
        ModulZugangsdaten: {
          include: {
            ModulEinstellungen: true,
          },
        },
      },
    });
    // console.log("getModulEinstellungen ", modulAktivData);
    if (!modulAktivData || modulAktivData?.ModulZugangsdaten)
      return console.error("Modul Einstellungen not found");

    return { ...modulAktivData.ModulZugangsdaten };
  } catch (error) {
    console.error("Create Zugangsdaten failed", error);
  }
}

export async function updateModulEinstellungen(
  shop: string,
  modulEinstellungen: ModulEinstellungenServer,
) {
  try {
    const einstellungenData = await getModulEinstellungen(shop);
    if (!einstellungenData)
      return console.error("Modul Einstellungen not found");

    const einstellungenUpdatedData = await db.modulEinstellungen.update({
      where: { id: einstellungenData.id },
      data: { ...modulEinstellungen },
    });
    return einstellungenUpdatedData;
  } catch (error) {
    console.error("Update Modul Einstellungen failed", error);
  }
}
