import { Rate } from "./albisMethods";

export type CalcData = {
  objektVersicherungVorhanden: string;
  finanzierungsbetragNetto: string;
  anzahlung: string;
  zahlungsweise: string;
  provision?: string;
  prodgrp?: string;
  vertragsart?: string;
};

export type CompanyManagerInfoData = {
  anrede: string;
  geburtsdatum: string;
  nachname: string;
  ortGF: string;
  plzGF: string;
  strasseGF: string;
  telGF: string;
  vorname: string;
}

export type CompanyInfoData = {
  bank: string;
  email: string;
  firmenname: string;
  ort: string;
  plz: string;
  rechtsform: string;
  strasse: string;
  telefon: string;
}

export interface LocalStorageI {
  calcData: CalcData;
  leasingRate: Rate;
  companyInfoData: CompanyInfoData;
  datenschutz: boolean;
  companyManagerInfoData: CompanyManagerInfoData;
}
