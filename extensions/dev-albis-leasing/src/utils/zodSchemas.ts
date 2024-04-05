import { z } from "zod";

const leasingRate = z.object({
  laufzeit: z.number(),
  rate: z.number(),
  versicherung: z.number(),
  schlusszahlung: z.number().optional(),
});

const resultLeasingRate = z.object({
  kaufpreis: z.number(),
  prodgrp: z.number(),
  mietsz: z.number(),
  vertragsart: z.number(),
  zahlweise: z.number(),
  provision: z.number(),
  kuendmonat: z.number(),
  raten: z.array(leasingRate),
});

export const leasingRateSchema = z.object({
  id: z.number(),
  jsonrpc: z.string(),
  result: resultLeasingRate,
});

const resultZahlungsweisen = z.object({
  id: z.number(),
  bezeichnung: z.string(),
  monate: z.number(),
});

export const getZahlungsweisenSchema = z.object({
  id: z.number(),
  jsonrpc: z.string(),
  result: z.array(resultZahlungsweisen),
});
