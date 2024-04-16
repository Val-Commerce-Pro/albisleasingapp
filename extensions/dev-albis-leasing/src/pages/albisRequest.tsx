import { PageTitle } from "../components/pagetitle";
import { SectionLeasingData } from "../components/sectionLeasingData";
import { SectionInfoCompany } from "../components/sectionInfoCompany";
import { SectionCompanyManager } from "../components/sectionCompanyManager";
import { initialStorageState, LocalStorageI } from "../types/localStorage";
import { ChangeEvent } from "react";
import { StelleAntrag } from "../types/albisMethods";
import { PluginConfig } from "../types/pluginConfig";
import { createAlbisAppAndDraftOrder } from "../utils/createAlbisAppAndDraftOrder";
import { formatDecimalNumber } from "../utils/formatValues";
import {Snackbar} from "../components/snackbar";

type AlbisRequestProps = {
  pluginConfData: PluginConfig;
};

export const AlbisRequest = ({
  pluginConfData,
}: AlbisRequestProps) => {

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? initialStorageState.toString());

    // Gather form data using FormData API
    const formData: StelleAntrag = {
      objekt: pluginConfData.modulEinstellungen.produktgruppeLabel,
      kaufpreis: formatDecimalNumber(localStorageJSON.calcData.finanzierungsbetragNetto),
      mietsz: localStorageJSON.calcData.anzahlung,
      laufzeit: localStorageJSON.leasingRate.laufzeit.toString(),
      rate: localStorageJSON.leasingRate.rate.toString(),
      leasingnehmer: {
        name: localStorageJSON.companyInfoData.firmenname,
        strasse: localStorageJSON.companyInfoData.strasse,
        plz: localStorageJSON.companyInfoData.plz,
        ort: localStorageJSON.companyInfoData.ort,
        rechtsform: localStorageJSON.companyInfoData.rechtsform,
        telefon: localStorageJSON.companyInfoData.telefon,
        email: localStorageJSON.companyInfoData.email,
        geschaeftsfuehrer: {
          anrede: localStorageJSON.companyManagerInfoData.anrede,
          vorname: localStorageJSON.companyManagerInfoData.vorname,
          nachname: localStorageJSON.companyManagerInfoData.nachname,
          strasse: localStorageJSON.companyManagerInfoData.strasseGF,
          plz: localStorageJSON.companyManagerInfoData.plzGF,
          ort: localStorageJSON.companyManagerInfoData.ortGF,
          gebdat: localStorageJSON.companyManagerInfoData.geburtsdatum,
          telnr: localStorageJSON.companyManagerInfoData.telGF
        }
      },
      provision: pluginConfData.modulEinstellungen.provisionsangabe,
      ssv: localStorageJSON.calcData.objektVersicherungVorhanden,
      prodgrp: pluginConfData.modulEinstellungen.produktgruppe,
      vertragsart: pluginConfData.modulEinstellungen.vertragsart,
      zahlweise: localStorageJSON.calcData.zahlungsweise,
      iban: localStorageJSON.companyInfoData.bank,
      service_pauschale: Number(pluginConfData.modulEinstellungen.servicePauschaleNetto),
      vertrag_an_ln: true
    }

    createAlbisAppAndDraftOrder(formData);
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? initialStorageState.toString());

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageJSON, "datenschutz": checked}),
    );
  }

  return (

    <div className="max-w-[1280px] shadow-sm mx-auto p-[16px]">
      <PageTitle title="Albis Leasing Request" />
      <SectionLeasingData />
      <form onSubmit={handleFormSubmit}>
        <div className="mt-[20px]">
          <SectionInfoCompany />
        </div>
        <div className="mt-[20px]">
          <SectionCompanyManager />
        </div>

        <div className="p-[12px] flex">
          <input onChange={(e) => handleChange(e)} type="checkbox" id="datenschutz" name="datenschutz" required className="mr-[16px]"/>
          <label htmlFor="datenschutz">Die Datenschutzbestimmungen habe ich zur Kenntnis genommen und bin einverstanden, dass meine Daten an die ALBIS Leasing Gruppe weitergegeben und gemäß der Datenschutzerklärung der ALBIS Leasing Gruppe dort verarbeitet werden.</label>
        </div>
        <input type="submit" className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300"/>
      </form>
      <Snackbar type="error" text="irgendwas"/>
    </div>
  );
};

export default AlbisRequest;
