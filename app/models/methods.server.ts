import db from "../db.server";

export async function getPluginConf(shop: string) {
  const pluginConfData = await db.modulAktiv.findUnique({
    where: { shop },
    include: {
      ModulZugangsdaten: {
        include: {
          ModulEinstellungen: true,
        },
      },
    },
  });

  return { ...pluginConfData };
}
