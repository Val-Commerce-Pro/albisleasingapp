import { ChangeEvent, useEffect, useState } from "react";
import { GetZahlungsweisen } from "../../types/albisMethods";
import { ShoppingCart } from "../../types/cartTypes";
import { CalcData } from "../../types/localStorage";
import { PluginConfig } from "../../types/pluginConfig";
import { getAlbisMethodsData } from "../../utils/getAlbisMethodsData";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";

type SectionCalculatorProps = {
  finanzierungsbetragNetto: ShoppingCart["total_price"];
  auswahlZahlungsweiseAnzeigen: PluginConfig["modulEinstellungen"]["auswahlZahlungsweiseAnzeigen"];
  auswahlObjektVersicherungAnzeigen: PluginConfig["modulEinstellungen"]["auswahlObjektVersicherungAnzeigen"];
  kundeKannFinanzierungsbetragAndern: PluginConfig["modulEinstellungen"]["kundeKannFinanzierungsbetragAndern"];
  zahlungsweisenPlugin: PluginConfig["modulEinstellungen"]["zahlungsweisen"];
  handleGetRate: (calcData: CalcData) => Promise<void>;
};

export const SectionCalculator = ({
  auswahlObjektVersicherungAnzeigen,
  auswahlZahlungsweiseAnzeigen,
  finanzierungsbetragNetto,
  kundeKannFinanzierungsbetragAndern,
  zahlungsweisenPlugin,
  handleGetRate,
}: SectionCalculatorProps) => {
  const [formData, setFormData] = useState(() => {
    const storageDataAsString = localStorage.getItem("cp@albisLeasing");
    const stateInitialData: CalcData =
      storageDataAsString && Object.keys(storageDataAsString).length > 1
        ? { ...JSON.parse(storageDataAsString).calcData }
        : {
            objektVersicherungVorhanden: "nein",
            finanzierungsbetragNetto: finanzierungsbetragNetto.toString(),
            anzahlung: "0",
            zahlungsweise: `${zahlungsweisenPlugin}`,
          };
    return stateInitialData;
  });

  useEffect(() => {
    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ calcData: formData }),
    );
  }, [formData]);

  const [zahlungsweisen, setZahlungsweisen] = useState<
    GetZahlungsweisen | undefined
  >();

  useEffect(() => {
    const getAlbisData = async () => {
      const zahlungsweisenData: GetZahlungsweisen =
        await getAlbisMethodsData("getZahlungsweisen");
      setZahlungsweisen(zahlungsweisenData);
    };
    getAlbisData();
  }, []);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    const dataFromLocalStorageAsString =
      localStorage.getItem("cp@albisLeasing");
    const dataFromLocalStorage = dataFromLocalStorageAsString
      ? JSON.parse(dataFromLocalStorageAsString)
      : {};
    const formattedCalcData: CalcData = {
      ...formData,
      finanzierungsbetragNetto: formData.finanzierungsbetragNetto.replace(
        /[^\d]/g,
        "",
      ),
      anzahlung: formData.anzahlung.replace(/[^\d]/g, ""),
    };
    const dataToLocalStorage = {
      ...dataFromLocalStorage,
      calcData: {
        ...formattedCalcData,
      },
    };
    localStorage.setItem("cp@albisLeasing", JSON.stringify(dataToLocalStorage));
    handleGetRate(formattedCalcData);
  }

  return (
    <Box
      title="Albis Leasingrechner"
      hasTooltip
      toolTipContent="Rechnen Sie hier schnell und einfach die zu zahlende monatliche Leasingrate für den geplanten Einkaufswert aus:
  Kaufpreis (ohne MwSt.) als Finanzierungsbetrag eintragen:"
    >
      <div className="w-full h-full flex flex-col gap-[16px] p-[12px] overflow-x-auto shadow-md rounded-b-lg">
        <Select
          handleChange={handleSelectChange}
          name="objektVersicherungVorhanden"
          label="Objekt-Versicherung vorhanden:"
          selectedValue={formData.objektVersicherungVorhanden}
          options={[
            { id: "ja", bezeichnung: "Ja" },
            { id: "nein", bezeichnung: "Nein" },
          ]}
          hidden={!auswahlObjektVersicherungAnzeigen}
        />
        <TextField
          name="finanzierungsbetragNetto"
          label="Finanzierungsbetrag (netto):"
          type="number"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={formData.finanzierungsbetragNetto}
          disabled={!kundeKannFinanzierungsbetragAndern}
        />
        <TextField
          name="anzahlung"
          label="Anzahlung"
          type="number"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={formData.anzahlung}
        />
        {zahlungsweisen && (
          <Select
            handleChange={handleSelectChange}
            name="zahlungsweise"
            label="Zahlungsweise:"
            selectedValue={zahlungsweisenPlugin}
            options={zahlungsweisen.result}
            disabled={!auswahlZahlungsweiseAnzeigen}
          />
        )}
        <div className="flex items-center justify-center w-full mt-[16px]">
          <button
            type="button"
            className="text-white font-bold bg-orange-400 rounded-md p-[12px] w-[250px] hover:bg-orange-300"
            onClick={handleSave}
          >
            Berechnen
          </button>
        </div>
      </div>
    </Box>
  );
};
