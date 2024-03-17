import db from "../db.server";
import type { ModulAktivServer } from "./types";

export async function updateOrCreateModulAktiv(
  modulAktivData: ModulAktivServer,
) {
  try {
    const { modulAktiv, shop } = modulAktivData;
    const data = await db.modulAktiv.update({
      where: { shop },
      data: { modulAktiv },
    });
    console.log("updateOrCreateModulAktiv", updateOrCreateModulAktiv);
    if (!data) return modulAktivData;
  } catch (error) {
    console.error("Create ModulAktiv failed", error);
  }
}

export async function getModulAktiv(shop: string) {
  try {
    const modulAktivData = await db.modulAktiv.findUnique({
      where: { shop },
    });
    if (!modulAktivData) {
      console.error("Modul Aktiv not found");
      return null;
    }
    return modulAktivData;
  } catch (error) {
    console.error("Create ModulAktiv failed", error);
    return null;
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
