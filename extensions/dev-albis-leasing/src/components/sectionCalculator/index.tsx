import { ChangeEvent, useState } from "react";
import { Box } from "../box";
// import { Select } from "../select";
import { CartItemsData } from "../../mockData/mockData";
import { TextField } from "../textfield";

type SectionCalculatorProps = {
  leasingValue: CartItemsData["total_price"];
};

export const SectionCalculator = ({ leasingValue }: SectionCalculatorProps) => {
  const [formData, setFormData] = useState({
    objektVersicherungVorhanden: "nein",
    finanzierungsbetragNetto: leasingValue,
    anzahlung: "nein",
    zahlungsweise: "nein",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSave() {
    console.log("handle Save render");
    console.log("formData", formData);
  }
  // const options = ["Ten", "Twenty", "Thirty"];
  return (
    <Box title="Artikel aus dem Warenkorb">
      <div className="textfieldContainer">
        <p>
          {` Rechnen Sie hier schnell und einfach die zu zahlende monatliche
          Leasingrate für den geplanten Einkaufswert aus:\n Kaufpreis (ohne MwSt.)
          als Finanzierungsbetrag eintragen:`}
        </p>
        {/* <div className="flex flex-col items-center justify-center h-screen">
          <Select label="Age" options={options} />
        </div> */}
        <TextField
          name="minLeasingsumme"
          label="minLeasingsumme"
          type="text"
          handleOnChange={handleChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={formData.finanzierungsbetragNetto.toString()}
          error={false}
          success={false}
        />
      </div>
    </Box>
  );
};
