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
  handleSave: (calcData: CalcData) => void;
};

export const SectionCalculator = ({
  auswahlObjektVersicherungAnzeigen,
  auswahlZahlungsweiseAnzeigen,
  finanzierungsbetragNetto,
  kundeKannFinanzierungsbetragAndern,
  zahlungsweisenPlugin,
  handleSave,
}: SectionCalculatorProps) => {
  const [formData, setFormData] = useState(() => {
    const storageDataAsString = localStorage.getItem("cp@albisLeasing");
    const stateInitialData: CalcData = storageDataAsString
      ? { ...JSON.parse(storageDataAsString).calcData }
      : {
          objektVersicherungVorhanden: "nein",
          finanzierungsbetragNetto: finanzierungsbetragNetto.toString(),
          anzahlung: "0",
          zahlungsweise: `${zahlungsweisenPlugin}`,
        };
    return stateInitialData;
  });

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

  return (
    <Box
      title="Albis Leasingrechner"
      hasTooltip
      toolTipContent="Rechnen Sie hier schnell und einfach die zu zahlende monatliche Leasingrate für den geplanten Einkaufswert aus:
  Kaufpreis (ohne MwSt.) als Finanzierungsbetrag eintragen:"
    >
      <div className="w-full h-full flex flex-col gap-4 p-3 overflow-x-auto shadow-md">
        <p className="text-xs mb-1">
          {`Quickly and easily calculate the monthly leasing rate to be paid for the planned purchase value:\n
            Enter the purchase price (excluding VAT) as the financing amount:`}
        </p>
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
          handleOnBlur={() => handleSave(formData)}
          handleKeyDown={() => handleSave(formData)}
          textFieldValue={formData.finanzierungsbetragNetto}
          disabled={!kundeKannFinanzierungsbetragAndern}
        />
        <TextField
          name="anzahlung"
          label="Anzahlung"
          type="number"
          handleOnChange={handleInputChange}
          handleOnBlur={() => handleSave(formData)}
          handleKeyDown={() => handleSave(formData)}
          textFieldValue={formData.anzahlung}
        />
        {zahlungsweisen && (
          <Select
            handleChange={handleSelectChange}
            name="zahlungsweise"
            label="Zahlungsweise:"
            selectedValue={zahlungsweisenPlugin}
            // options={[
            //   { value: "quartalsweise", label: "quartalsweise" },
            //   { value: "monatlich", label: "monatlich" },
            // ]}
            options={zahlungsweisen.result}
            disabled={!auswahlZahlungsweiseAnzeigen}
          />
        )}
        <div className="flex items-center justify-center w-full mt-4">
          <button
            type="button"
            className="text-white font-bold bg-orange-400 rounded-md p-3 w-[250px] hover:bg-orange-300"
            onClick={() => handleSave(formData)}
          >
            Berechen
          </button>
        </div>
      </div>
    </Box>
  );
};
