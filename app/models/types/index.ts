import type {
  // ModulAktiv,
  ModulEinstellungen,
  ModulZugangsdaten,
} from "@prisma/client";

// export type ModulAktivServer = Omit<ModulAktiv, "id" | "ModulZugangsdaten">;

export type ModulAktivServer = {
  shop: string;
  modulAktiv?: boolean;
};

export type ModulZugangsdatenServer = Omit<
  ModulZugangsdaten,
  "id" | "ModulEinstellungen" | "modulAktivId"
>;
export type ModulEinstellungenServer = Omit<
  ModulEinstellungen,
  "id" | "zugangsdatenId"
>;
