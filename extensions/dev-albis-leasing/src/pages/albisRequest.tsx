import { ChangeEvent, useEffect, useState } from "react";
import { Modal, openModal } from "../components/modal";
import { PageTitle } from "../components/pagetitle";
import { SectionCompanyManager } from "../components/sectionCompanyManager";
import { SectionInfoCompany } from "../components/sectionInfoCompany";
import { SectionLeasingData } from "../components/sectionLeasingData";
import {
  GetStelleAntrag,
  JsonRpcErrorResponse,
  StelleAntrag,
} from "../types/albisMethods";
import { ShoppingCart } from "../types/cartTypes";
import { LocalStorageI, initialStorageState } from "../types/localStorage";
import { PluginConfig } from "../types/pluginConfig";
import {
  LineItem,
  createAlbisAppAndDraftOrder,
} from "../utils/createAlbisAppAndDraftOrder";
import {
  formatDecimalNumber,
  isJsonRpcErrorResponse,
} from "../utils/formatValues";
import { isFormFilled, resetForm } from "../utils/formValidation";
import { useNavigate } from "react-router-dom";

type AlbisRequestProps = {
  cartData: ShoppingCart;
  pluginConfData: PluginConfig;
};

export const AlbisRequest = ({
  pluginConfData,
  cartData,
}: AlbisRequestProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseSuccess, setResponseSuccess] = useState(true);
  const [responseText, setResponseText] = useState(
    "Deine Leasing Anfrage an Albis wurde erfolgreich versendet! Weitere Informationen erhalten Sie per Mail",
  );
  const navigate = useNavigate();

  useEffect(() => {
    isFormFilled(true);
  }, []);

  const handleFormSubmit = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    isFormFilled();
    event.preventDefault();
    setIsLoading(true);

    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(
      localStorageData ?? initialStorageState.toString(),
    );

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

    const lineItems: LineItem[] = cartData.items.map((item) => ({
      variantId: `gid://shopify/ProductVariant/${item.id}`,
      quantity: item.quantity,
    }));

    const response: GetStelleAntrag | JsonRpcErrorResponse =
      await createAlbisAppAndDraftOrder(formData, lineItems);

    setIsLoading(false);

    if (isJsonRpcErrorResponse(response)) {
      setErrorMsg(response.error.message);
      setResponseSuccess(false);
      setResponseText(response.error.message);
    } else {
      setErrorMsg("");
      setResponseSuccess(true);
      setResponseText(
        "Deine Leasing Anfrage an Albis wurde erfolgreich versendet! Weitere Informationen erhalten Sie per Mail",
      );
      localStorage.clear();
      resetForm();
    }
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    isFormFilled();
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
      <form id="alr-form">
        <div className="grid grid-cols-2 gap-[8px]">
          <div className="mt-[20px]">
            <SectionInfoCompany />
          </div>
          <div className="mt-[20px]">
            <SectionCompanyManager />
          </div>
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
        <div className="flex justify-between items-center">
          <button
            onClick={openModal}
            type="button"
            data-modal-target="static-modal"
            id="modal-button"
            data-modal-toggle="static-modal"
            className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300 disabled:bg-gray-300 disabled:pointer-events-none"
          >
            Senden
          </button>
          <button
            className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[150px] hover:bg-orange-300 disabled:bg-gray-300 disabled:pointer-events-none"
            onClick={() => navigate("/pages/albis-leasing")}
            type="button"
          >
            Zurück
          </button>
        </div>

        <Modal
          onSubmit={handleFormSubmit}
          isLoading={isLoading}
          success={responseSuccess}
          text={responseText}
        />
      </form>
    </div>
  );
};

export default AlbisRequest;
