// const selectedStatus = {
//   "505": "Warten auf Entscheidungsunterlagen",
//   "510": "Warten auf Entscheidungsunterlagen",
//   "930": "Antrag abgelehnt",
//   "970": "Antrag genehmigt. Bitte Unterlagen einsenden.",
//   "971": "Vertragsunterlagen unvollständig.",
//   "972": "Vertragsunterlagen unvollständig.",
//   "976": "Prüfung/Abrechnung",
//   "978": "Prüfung/Abrechnung",
//   "980": "abgerechnet",
//   "996": "wird storniert",
//   "997": "storniert",

import { getCurrentFormattedTime } from "./formatData";

// };
const statusToFinishLeasingRequest = [930, 970, 971, 972, 980, 996, 997];

export const checkAntragStatus = (
  status: number,
  statusTxt: string,
): string | false => {
  const isFinishStatus = statusToFinishLeasingRequest.includes(status);
  return (
    isFinishStatus &&
    `Albis Leasing Request Status: ${statusTxt} - Checked at - ${getCurrentFormattedTime()}`
  );
};
