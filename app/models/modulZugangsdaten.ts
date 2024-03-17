import db from "../db.server";
// import { getModulAktiv } from "./modulAktiv.server";
// import type { ModulZugangsdatenServer } from "./types";

// export async function getOrCreateModulZugangsdaten(
//   shop: string,
//   modulZugangsdaten?: ModulZugangsdatenServer,
// ) {
//   try {
//     const data = await getModulZugangsdaten(shop);
//     console.log("createModulZugangsdaten", data);

// if (!data?.modulAktivData) {
//   const newModulZugangsdatenData = await db.modulZugangsdaten.create({
//     data: {
//       ...modulZugangsdaten,
//       modulAktiv: {
//         connect: { id: data.id },
//       },
//     },
//   });
//       return data;
//     }

//     const updatedData = await db.modulZugangsdaten.update({
//       where: { id: data.id },
//       data: { ...modulZugangsdaten },
//     });
//     return updatedData;
//   } catch (error) {
//     console.error("Create ModulZugangsdaten failed", error);
//   }
// }

export async function getModulZugangsdaten(shop: string) {
  try {
    const modulAktivData = await db.modulAktiv.findUnique({
      where: { shop },
      include: {
        ModulZugangsdaten: true,
      },
    });
    if (!modulAktivData) {
      console.error("Modul Aktiv not found");
      return null;
    }

    return { modulAktivData };
  } catch (error) {
    console.error("Create Zugangsdaten failed", error);
  }
}

// export async function updateModulZugangsdaten(
//   shop: string,
//   modulZugangsdaten: ModulZugangsdatenServer,
// ) {
//   try {
//     const data = await getModulZugangsdaten(shop);
//     if (!data) {
//       console.error("Modul Zugangsdaten not found");
//       return null;
//     }

//     const updatedData = await db.modulZugangsdaten.update({
//       where: { id: data.id },
//       data: { ...modulZugangsdaten },
//     });
//     return updatedData;
//   } catch (error) {
//     console.error("Update Zugangsdaten failed", error);
//   }
// }
