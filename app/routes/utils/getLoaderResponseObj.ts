import type {
  GetProduktgruppen,
  GetVertragsarten,
  GetZahlungsweisen,
} from "../types/methods";
import type {
  ModulAktivData,
  ModulEinstellungenData,
  ModulZugangsdatenData,
  PluginConfData,
} from "../types/pluginConfigurator";

type GetLoaderResponse = {
  modulAktiv?: ModulAktivData;
  modulZugangsdaten?: ModulZugangsdatenData;
  modulEinstellungen?: ModulEinstellungenData;
  isCredentialsValid?: boolean;
  methods?: {
    zahlungsweisen: GetZahlungsweisen;
    produktgruppen: GetProduktgruppen;
    vertragsarten: GetVertragsarten;
  };
};

export const getLoaderResponse = ({
  modulAktiv,
  modulEinstellungen,
  modulZugangsdaten,
  isCredentialsValid,
  methods,
}: GetLoaderResponse) => {
  const loaderReturn: PluginConfData = {
    modulAktiv: {
      isModulAktiv: modulAktiv?.isModulAktiv ?? false,
      shop: modulAktiv?.shop ?? "",
    },
    modulZugangsdaten: {
      isCredentialsValid: isCredentialsValid ?? false,
      apiLink: modulZugangsdaten?.apiLink ?? "",
      benutzer: modulZugangsdaten?.benutzer ?? "",
      passwort: modulZugangsdaten?.passwort ?? "",
    },
    modulEinstellungen: {
      vertragsart: modulEinstellungen?.vertragsart ?? "",
      restwertInBeiTAVertrag:
        modulEinstellungen?.restwertInBeiTAVertrag ?? null,
      produktgruppe: modulEinstellungen?.produktgruppe ?? "",
      zahlungsweisen: modulEinstellungen?.zahlungsweisen ?? "",
      auswahlZahlungsweiseAnzeigen:
        modulEinstellungen?.auswahlZahlungsweiseAnzeigen ?? false,
      minLeasingsumme: modulEinstellungen?.minLeasingsumme ?? "",
      servicePauschaleNetto: modulEinstellungen?.servicePauschaleNetto ?? "",
      albisServiceGebuhrNetto:
        modulEinstellungen?.albisServiceGebuhrNetto ?? "",
      provisionsangabe: modulEinstellungen?.provisionsangabe ?? "",
      objektVersicherung: modulEinstellungen?.objektVersicherung ?? false,
      auswahlObjektVersicherungAnzeigen:
        modulEinstellungen?.auswahlObjektVersicherungAnzeigen ?? false,
      mietsonderzahlung: modulEinstellungen?.mietsonderzahlung ?? "",
      eingabeSonderzahlungErmoglichen:
        modulEinstellungen?.eingabeSonderzahlungErmoglichen ?? false,
      pInfoseiteZeigeAlle: modulEinstellungen?.pInfoseiteZeigeAlle ?? false,
      antragOhneArtikelMoglich:
        modulEinstellungen?.antragOhneArtikelMoglich ?? false,
      kundeKannFinanzierungsbetragAndern:
        modulEinstellungen?.kundeKannFinanzierungsbetragAndern ?? false,
    },
    methodsData: {
      zahlungsweisen: methods?.zahlungsweisen,
      produktgruppen: methods?.produktgruppen,
      vertragsarten: methods?.vertragsarten,
    },
  };

  return loaderReturn;
};
