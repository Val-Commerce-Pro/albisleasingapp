interface ResultVertragsarten {
  id: number;
  bezeichnung: string;
  kuerzel: string;
  pos: number;
}

interface ResultProduktgruppen {
  id: number;
  bezeichnung: string;
  lz_min: number;
  lz_max: number;
  lz_min_albis: number;
  lz_max_albis: number;
  kuendmonat: number;
  pos: number;
}

interface ResultZahlungsweisen {
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
