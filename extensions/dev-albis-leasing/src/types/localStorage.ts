import { Rate } from "./albisMethods";

export type CalcData = {
  objektVersicherungVorhanden: string;
  finanzierungsbetragNetto: string;
  anzahlung: string;
  zahlungsweise: string;
};

export interface LocalStorageI {
  calcData: CalcData;
  leasingRate: Rate;
}
