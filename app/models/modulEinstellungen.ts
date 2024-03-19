import type { ModulEinstellungenData } from "~/routes/types/pluginConfigurator";
import db from "../db.server";

async function updateModulEinstellungen(
  shop: string,
  modulEinstellungen: ModulEinstellungenData,
) {
  try {
    const einstellungenData = await getModulEinstellungen(shop);
    console.log("einstellungenData - ", einstellungenData);
    if (!einstellungenData) return null;

    const einstellungenUpdatedData = await db.modulEinstellungen.update({
      where: { id: einstellungenData.id },
      data: { ...modulEinstellungen },
    });
    return einstellungenUpdatedData;
  } catch (error) {
    console.error("Update Modul Einstellungen failed", error);
  }
}

async function createModulEinstellungen(
  id: number,
  modulEinstellungen: ModulEinstellungenData,
) {
  const modulEinstellungenData = await db.modulEinstellungen.create({
    data: {
      ...modulEinstellungen,
      zugangsdaten: {
        connect: { id },
      },
    },
  });
  return modulEinstellungenData;
}

export async function updateOrCreateModulEinstellungen(
  shop: string,
  modulEinstellungen: ModulEinstellungenData,
) {
  try {
    const modulZugangsdatenData = await updateModulEinstellungen(
      shop,
      modulEinstellungen,
    );
    if (!modulZugangsdatenData) return null;

    const newModulEinstellungen = createModulEinstellungen(
      modulZugangsdatenData.id,
      modulEinstellungen,
    );
    return newModulEinstellungen;
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
    console.log("getModulEinstellungen ", modulAktivData);
    if (!modulAktivData || modulAktivData?.ModulZugangsdaten) return null;

    return { ...modulAktivData.ModulZugangsdaten };
  } catch (error) {
    console.error("Create Zugangsdaten failed", error);
  }
}
