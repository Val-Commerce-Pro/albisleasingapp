import type { ModulAktiv } from "@prisma/client";

export type UpdateOrCreateModulAktivServer = Omit<
  ModulAktiv,
  "id" | "ModulZugangsdaten"
>;

export type GetModulAktivServer = {
  shop: string;
  modulAktiv?: boolean;
};
