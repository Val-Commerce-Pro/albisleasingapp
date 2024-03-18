import type { ModulAktiv, ModulZugangsdaten } from "@prisma/client";
import type { modulEinstellungenInitialValues } from "../components/modulEinstellungen";

export type ModulAktivData = Omit<ModulAktiv, "id">;

export type ModulZugangsdatenData = Omit<
  ModulZugangsdaten,
  "id" | "modulAktivId"
>;

export type ModulEinstellungenType = typeof modulEinstellungenInitialValues;

export type PluginConfData = {
  modulAktiv: ModulAktivData;
  modulZugangsdaten: ModulZugangsdatenData;
};
