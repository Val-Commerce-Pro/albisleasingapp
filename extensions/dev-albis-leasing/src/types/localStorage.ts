export type Werte = {
  kaufpreis?: string;
  prodgrp?: string;
  mietsz?: string;
  vertragsart?: string;
  zahlweise?: string;
  provision?: string;
};

export type LocalStorageData = {
  werte: Werte;
};
