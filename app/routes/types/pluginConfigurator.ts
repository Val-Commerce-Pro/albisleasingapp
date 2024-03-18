import type { modulEinstellungenInitialValues } from "../components/modulEinstellungen";
import type { accessDataInitialValues } from "../components/zagangsdaten";

export type AccessDataI = typeof accessDataInitialValues;
export type ModulZugangsdatenData = Omit<
  typeof accessDataInitialValues,
  "_action"
>;

export type ModulEinstellungenType = typeof modulEinstellungenInitialValues;
