export const pluginConfiguratorMockData = {
  modulAktiv: true,
  modulZugangsdaten: {
    apiLink: `https://testschnittstelle.albis-leasing.de/Shop`,
    benutzer: "test340534@t.de",
    passwort: "Albis1234",
  },
  modulEinstellungen: {
    vertragsart: "VA-Leasingvertrag",
    restwertInBeiTAVertrag: null,
    produktgruppe: "Großküchentechnick",
    zahlungsweisen: "quartalsweise",
    auswahlZahlungsweiseAnzeigen: true,
    minLeasingsumme: "500",
    servicePauschaleNetto: "",
    albisServiceGebuhrNetto: "67.50",
    provisionsangabe: "5",
    objektVersicherung: true,
    auswahlObjektVersicherungAnzeigen: true,
    mietsonderzahlung: "",
    eingabeSonderzahlungErmoglichen: true,
    pInfoseiteZeigeAlle: true,
    antragOhneArtikelMoglich: true,
    kundeKannFinanzierungsbetragAndern: true,
  },
};

export type PluginConfiguratorMockData = typeof pluginConfiguratorMockData;
