import db from "../db.server";
// import { pluginConfiguratorMockData } from "../mockData/pluginConfiguratorMockData";

// const { modulAktiv } = pluginConfiguratorMockData;
export async function getPluginConf(shop: string) {
  const modulAktivData = await db.modulAktiv.findUnique({
    where: { shop },
    // include: {
    //   ModulZugangsdaten: {
    //     include: {
    //       ModulEinstellungen: true,
    //     },
    //   },
    // },
  });
  // if (!modulAktivData) {
  //   const entry = await createMockPluginConfiguration(shop);
  //   return entry;
  // }
  // console.log("getOrCreatePluginConfiguration", modulAktivData);
  // const { modulAktiv, id } = modulAktivData;

  // if (!modulAktiv) return modulAktiv;
  // const pluginConfiguratorData = await db.modulZugangsdaten.findUnique({
  //   where: { modulAktivId: id },
  //   include: {
  //     ModulEinstellungen: true,
  //   },
  // });
  // console.log("pluginConfiguratorData", pluginConfiguratorData);
  return { modulAktivData };
}

// export async function createMockPluginConfiguration(shop: string) {
//   const { modulEinstellungen, modulZugangsdaten } = pluginConfiguratorMockData;

//   // Assemble the data for ModulAktiv, including the nested relations
//   const data = {
//     shop,
//     modulAktiv,
//     ModulZugangsdaten: {
//       create: {
//         modulZugangsdaten,
//         ModulEinstellungen: modulEinstellungen,
//       },
//     },
//   };

//   try {
//     // Use Prisma's nested write to create the ModulAktiv entry along with its related ModulZugangsdaten and ModulEinstellungen
//     const settings = await db.modulAktiv.create({
//       data,
//     });

//     return settings;
//   } catch (error) {
//     console.error("Failed to create plugin configuration:", error);
//     return null;
//   }
// }
