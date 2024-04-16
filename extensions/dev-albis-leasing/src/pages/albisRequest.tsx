import { ChangeEvent, useState } from "react";
import { Modal, closeModal, openModal } from "../components/modal";
import { PageTitle } from "../components/pagetitle";
import { SectionCompanyManager } from "../components/sectionCompanyManager";
import { SectionInfoCompany } from "../components/sectionInfoCompany";
import { SectionLeasingData } from "../components/sectionLeasingData";
import { Snackbar, openSnackbar } from "../components/snackbar";
import { GetStelleAntrag, StelleAntrag } from "../types/albisMethods";
import { ShoppingCart } from "../types/cartTypes";
import { LocalStorageI, initialStorageState } from "../types/localStorage";
import { PluginConfig } from "../types/pluginConfig";
import {
  LineItem,
  createAlbisAppAndDraftOrder,
} from "../utils/createAlbisAppAndDraftOrder";
import { formatDecimalNumber } from "../utils/formatValues";

type AlbisRequestProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfig;
};

export const AlbisRequest = ({
  pluginConfData,
  cartData,
}: AlbisRequestProps) => {
  const [responseSuccess, setResponseSuccess] = useState(true);
  const [senden] = useState("Senden");
  const [responseText, setResponseText] = useState(
    "Deine Leasing Anfrage an Albis wurde erfolgreich versendet! Weitere Informationen erhalten Sie per Mail",
  );

  const handleFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();

    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(
      localStorageData ?? initialStorageState.toString(),
    );

    // Gather form data using FormData API
    const formData: StelleAntrag = {
      objekt: pluginConfData.modulEinstellungen.produktgruppeLabel,
      kaufpreis: formatDecimalNumber(
        localStorageJSON.calcData.finanzierungsbetragNetto,
      ),
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
          telnr: localStorageJSON.companyManagerInfoData.telGF,
        },
      },
      provision: pluginConfData.modulEinstellungen.provisionsangabe,
      ssv: localStorageJSON.calcData.objektVersicherungVorhanden,
      prodgrp: pluginConfData.modulEinstellungen.produktgruppe,
      vertragsart: pluginConfData.modulEinstellungen.vertragsart,
      zahlweise: localStorageJSON.calcData.zahlungsweise,
      iban: localStorageJSON.companyInfoData.bank,
      service_pauschale: Number(
        pluginConfData.modulEinstellungen.servicePauschaleNetto,
      ),
      vertrag_an_ln: true,
    };

    const lineItem: LineItem[] = cartData.items.map((item) => ({
      variantId: `gid://shopify/ProductVariant/${item.id}`,
      quantity: item.quantity,
    }));
    try {
      const response: GetStelleAntrag = await createAlbisAppAndDraftOrder(
        formData,
        lineItem,
      );
      console.log("response", response);
      if (!response.result) {
        throw new Error(`HTTP error! Status: ${response}`);
      }

      setResponseSuccess(true);
      setResponseText(
        "Deine Leasing Anfrage an Albis wurde erfolgreich versendet! Weitere Informationen erhalten Sie per Mail",
      );
      openSnackbar();
      closeModal();
      //localStorage.clear();
      //TODO: reset form values
    } catch (error) {
      console.log("error", error);
      setResponseSuccess(false);
      // setResponseText(error as string);
      openSnackbar();
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(
      localStorageData ?? initialStorageState.toString(),
    );

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageJSON, datenschutz: checked }),
    );
  }

  return (
    <div className="max-w-[1280px] shadow-sm mx-auto p-[16px]">
      <PageTitle title="Albis Leasing Request" />
      <SectionLeasingData />
      <form>
        <div className="mt-[20px]">
          <SectionInfoCompany />
        </div>
        <div className="mt-[20px]">
          <SectionCompanyManager />
        </div>

        <div className="p-[12px] flex">
          <input
            onChange={(e) => handleChange(e)}
            type="checkbox"
            id="datenschutz"
            name="datenschutz"
            required
            className="mr-[16px]"
          />
          <label htmlFor="datenschutz">
            Die Datenschutzbestimmungen habe ich zur Kenntnis genommen und bin
            einverstanden, dass meine Daten an die ALBIS Leasing Gruppe
            weitergegeben und gemäß der Datenschutzerklärung der ALBIS Leasing
            Gruppe dort verarbeitet werden.
          </label>
        </div>
        <input
          value={senden}
          onClick={openModal}
          type="button"
          data-modal-target="static-modal"
          id="modal-button"
          data-modal-toggle="static-modal"
          className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300"
        />
      </form>
      <Snackbar success={responseSuccess} text={responseText} />
      <Modal onSubmit={handleFormSubmit} />
    </div>
  );
};

export default AlbisRequest;
