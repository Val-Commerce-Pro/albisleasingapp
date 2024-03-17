import db from "../db.server";
import type { UpdateOrCreateModulAktivServer } from "./types";

export async function updateOrCreateModulAktiv(
  modulAktivData: UpdateOrCreateModulAktivServer,
) {
  try {
    const { modulAktiv, shop } = modulAktivData;
    const data = await updateModulAktiv(modulAktivData);

    console.log("updateOrCreateModulAktiv", data);
    if (data) return data;

    const newModulAktiv = await db.modulAktiv.create({
      data: {
        shop,
        modulAktiv,
      },
    });
    console.log("newModulAktiv", newModulAktiv);
    return newModulAktiv;
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

export async function updateModulAktiv(
  modulAktiv: UpdateOrCreateModulAktivServer,
) {
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
