import db from "../db.server";
import type { ModulAktivServer } from "./types";

export async function getOrCreateModulAktiv(modulAktivData: ModulAktivServer) {
  try {
    const data = await db.modulAktiv.findUnique({
      where: { shop: modulAktivData.shop },
    });
    if (!data) {
      const newModulAktivData = await db.modulAktiv.create({
        data: {
          shop: modulAktivData.shop,
          modulAktiv: modulAktivData.modulAktiv ?? false,
        },
      });
      return newModulAktivData;
    }
    return data;
  } catch (error) {
    console.error("Create ModulAktiv failed", error);
  }
}

export async function getModulAktiv(shop: string) {
  try {
    const modulAktivData = await db.modulAktiv.findUnique({
      where: { shop },
    });
    if (!modulAktivData || !modulAktivData?.modulAktiv)
      return console.error("Modul Aktiv needs to be true");
    return modulAktivData;
  } catch (error) {
    console.error("Create ModulAktiv failed", error);
  }
}

export async function updateModulAktiv(modulAktiv: ModulAktivServer) {
  try {
    const { modulAktiv: mdData, shop } = modulAktiv;
    const modulAktivData = await db.modulAktiv.update({
      where: { shop },
      data: { modulAktiv: mdData },
    });
    return modulAktivData;
  } catch (error) {
    console.error("Update ModulAktiv failed", error);
  }
}
