import type { ModulZugangsdaten } from "@prisma/client";
import type { modulEinstellungenInitialValues } from "../components/modulEinstellungen";

export type ModulZugangsdatenData = Omit<
  ModulZugangsdaten,
  "id" | "modulAktivId"
>;

export type ModulEinstellungenType = typeof modulEinstellungenInitialValues;
