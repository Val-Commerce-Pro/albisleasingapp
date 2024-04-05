import { ChangeEvent, useEffect, useState } from "react";
import { GetZahlungsweisen } from "../../types/albisMethods";
import { ShoppingCart } from "../../types/cartTypes";
import { PluginConfig } from "../../types/pluginConfig";
import { getAlbisMethodsData } from "../../utils/getAlbisMethodsData";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";

type SectionCalculatorProps = {
  calcData: {
    leasingValue: ShoppingCart["total_price"];
    auswahlZahlungsweiseAnzeigen: PluginConfig["modulEinstellungen"]["auswahlZahlungsweiseAnzeigen"];
    auswahlObjektVersicherungAnzeigen: PluginConfig["modulEinstellungen"]["auswahlObjektVersicherungAnzeigen"];
    kundeKannFinanzierungsbetragAndern: PluginConfig["modulEinstellungen"]["kundeKannFinanzierungsbetragAndern"];
    zahlungsweisen: PluginConfig["modulEinstellungen"]["zahlungsweisen"];
  };
};

export const SectionCalculator = ({ calcData }: SectionCalculatorProps) => {
  const [formData, setFormData] = useState({
    objektVersicherungVorhanden: "nein",
    finanzierungsbetragNetto: `${calcData.leasingValue}`,
    anzahlung: "0",
    zahlungsweise: `${calcData.zahlungsweisen}`,
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
    console.log("name, value Input", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    console.log("name, value Select", name, value);
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSave() {
    console.log("should save on the local storage");
  }
  return (
    <Box title="Albis Leasingrechner">
      <div className="flex flex-col gap-4 p-3 overflow-x-auto shadow-md sm:rounded-lg">
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
          hidden={!calcData.auswahlObjektVersicherungAnzeigen}
        />
        <TextField
          name="finanzierungsbetragNetto"
          label="Finanzierungsbetrag (netto):"
          type="number"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={formData.finanzierungsbetragNetto}
          disabled={!calcData.kundeKannFinanzierungsbetragAndern}
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
            selectedValue={calcData.zahlungsweisen}
            // options={[
            //   { value: "quartalsweise", label: "quartalsweise" },
            //   { value: "monatlich", label: "monatlich" },
            // ]}
            options={zahlungsweisen.result}
            disabled={!calcData.auswahlZahlungsweiseAnzeigen}
          />
        )}
      </div>
    </Box>
  );
};
