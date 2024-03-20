import type {
  ModulAktiv,
  ModulEinstellungen,
  ModulZugangsdaten,
} from "@prisma/client";
import type {
  GetProduktgruppen,
  GetVertragsarten,
  GetZahlungsweisen,
} from "./methods";

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
  methodsData: {
    zahlungsweisen?: GetZahlungsweisen;
    produktgruppen?: GetProduktgruppen;
    vertragsarten?: GetVertragsarten;
  };
};

export type ActionResponseDefault = {
  success?: boolean;
  error?: string;
};

export type ActionZugangsdatenResponse = {
  // success: boolean;
  data: {
    isCredentialsValid: boolean;
    zahlungsweisen: GetZahlungsweisen;
    produktgruppen: GetProduktgruppen;
    vertragsarten: GetVertragsarten;
  };
};
