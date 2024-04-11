export type Rate = {
  laufzeit: number;
  rate: number;
  versicherung: number;
  schlusszahlung?: number;
};

export type Result = {
  kaufpreis: number;
  prodgrp: number;
  mietsz: number;
  vertragsart: number;
  zahlweise: number;
  provision: number;
  kuendmonat: number;
  raten: Rate[];
};

export type LeasingRate = {
  id: number;
  jsonrpc: string;
  result: Result;
};

export type RechtsformResult = {
  id: number,
  text: string,
  crefo: string
};

export type Rechtsformen = {
  id: number;
  jsonrpc: string;
  result: RechtsformResult[];
};

export type ResultZahlungsweisen = {
  id: number;
  bezeichnung: string;
  monate: number;
};
export type GetZahlungsweisen = {
  id: number;
  jsonrpc: string;
  result: ResultZahlungsweisen[];
};

export type Werte = {
  kaufpreis?: string;
  prodgrp?: string;
  mietsz?: string;
  vertragsart?: string;
  zahlweise?: string;
  provision?: string;
};
