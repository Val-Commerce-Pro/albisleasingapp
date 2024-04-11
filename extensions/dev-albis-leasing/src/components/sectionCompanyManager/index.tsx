import { ChangeEvent, useState } from "react";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";
import { LocalStorageI } from "../../types/localStorage";

export const SectionCompanyManager = () => {
  const [companyManagerFormData, setCompanyManagerFormData] = useState({
    anrede: 0,
    vorname: "",
    nachname: "",
    strasseGF: "",
    plzGF: "",
    ortGF: "",
    telGF: "",
    geburstdatum: "",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log("name, value Input", name, value);
    setCompanyManagerFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    console.log("name, value Select", name, value);
    setCompanyManagerFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSave() {
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? "No data");

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageJSON, companyManagerFormData }),
    );
  }

  return (
    <Box title="Angaben zum Geschäftsführer">
      <div className="overflow-x-auto shadow-md sm:rounded-lg p-3 flex flex-col gap-4">
        <Select
          handleChange={handleSelectChange}
          onBlur={handleSave}
          name="anrede"
          label="Anrede"
          selectedValue={companyManagerFormData.anrede}
          options={[
            { id: 1, bezeichnung: "Herr" },
            { id: 2, bezeichnung: "Frau" },
          ]}
          required
        />
        <TextField
          name="vorname"
          label="Vorname"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.vorname}
          required
        />
        <TextField
          name="nachname"
          label="Nachname"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.nachname}
          required
        />
        <TextField
          name="strasseGF"
          label="Strasse (GF)"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.strasseGF}
          required
        />
        <TextField
          name="plzGF"
          label="Postleitzahl (GF)"
          type="number"
          pattern="[0-9]{5}"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.plzGF}
          required
        />
        <TextField
          name="ortGF"
          label="Ort (GF)"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.ortGF}
          required
        />
        <TextField
          name="geburtsdatum"
          label="Geburtsdatum"
          type="date"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          required
        />
      </div>
    </Box>
  );
};
