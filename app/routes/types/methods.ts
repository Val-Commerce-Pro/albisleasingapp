export interface ResultVertragsarten {
  id: number;
  bezeichnung: string;
  kuerzel: string;
  pos: number;
}

export interface ResultProduktgruppen {
  id: number;
  bezeichnung: string;
  lz_min: number;
  lz_max: number;
  lz_min_albis: number;
  lz_max_albis: number;
  kuendmonat: number;
  pos: number;
}

export interface ResultZahlungsweisen {
  id: number;
  bezeichnung: string;
  monate: number;
}

export interface GetVertragsarten {
  id: number;
  jsonrpc: string;
  result: ResultVertragsarten[];
}

export interface GetProduktgruppen {
  id: number;
  jsonrpc: string;
  result: ResultProduktgruppen[];
}

export interface GetZahlungsweisen {
  id: number;
  jsonrpc: string;
  result: ResultZahlungsweisen[];
}

export interface StelleAntrag {
  antragsdaten: Antragsdaten;
}

export interface Antragsdaten {
  objekt?: string;
  kaufpreis: string;
  mietsz: string;
  laufzeit: string;
  rate: string;
  leasingnehmer: Leasingnehmer;
  provision: string;
  ssv: string;
  prodgrp: string;
  vertragsart: string;
  zahlweise: string;
  iban: string;
  service_pauschale: number;
  vertrag_an_ln: boolean;
}

export interface Leasingnehmer {
  name: string;
  strasse: string;
  plz: string;
  ort: string;
  rechtsform: string;
  telefon: string;
  faxnr: string;
  email: string;
  geschaeftsfuehrer: Geschaeftsfuehrer;
}

export interface Geschaeftsfuehrer {
  anrede: number;
  vorname: string;
  nachname: string;
  strasse: string;
  plz: string;
  ort: string;
  gebdat: string; // Date in YYYY-MM-DD format
  telnr: string;
  faxnr: string;
}
