import type {
  ModulAktiv,
  ModulEinstellungen,
  ModulZugangsdaten,
} from "@prisma/client";

export type ModulAktivData = Omit<ModulAktiv, "id">;

export type ModulZugangsdatenData = Omit<
  ModulZugangsdaten,
  "id" | "modulAktivId"
>;

export type ModulEinstellungenData = Omit<
  ModulEinstellungen,
  "id" | "zugangsdatenId"
>;

export type ModulZugangsdatenPlugin = {
  isCredentialsValid: boolean;
} & ModulZugangsdatenData;

export type PluginConfData = {
  modulAktiv: ModulAktivData;
  modulZugangsdaten: ModulZugangsdatenPlugin;
  modulEinstellungen: ModulEinstellungenData;
};
