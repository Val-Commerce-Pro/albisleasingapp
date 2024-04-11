import { ChangeEvent, useState } from "react";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";

export const SectionCompanyManager = () => {
  const [companyManagerFormData, setCompanyManagerFormData] = useState({
    rechtsform: "",
    firmenname: "",
    strasse: "",
    plz: "",
    ort: "",
    tel: "",
    email: "",
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
    console.log("should save on the local storage");
  }

  return (
    <Box title="Angaben zum Geschäftsführer">
      <div className="overflow-x-auto shadow-md sm:rounded-lg p-3 flex flex-col gap-4">
        <Select
          handleChange={handleSelectChange}
          name="anrede"
          label="Anrede"
          selectedValue={companyManagerFormData.rechtsform}
          options={[
            { id: "Herr", bezeichnung: "Herr" },
            { id: "Frau", bezeichnung: "Frau" },
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
          textFieldValue={companyManagerFormData.firmenname}
          required
        />
        <TextField
          name="nachname"
          label="Nachname"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.strasse}
          required
        />
        <TextField
          name="strasse"
          label="Strasse (GF)"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.plz}
          required
        />
        <TextField
          name="plz"
          label="Postleitzahl (GF)"
          type="number"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.ort}
          required
        />
        <TextField
          name="ort"
          label="Ort (GF)"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.tel}
          required
        />
        <TextField
          name="geburtsdatum"
          label="Geburtsdatum"
          type="date"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.email}
          required
        />
      </div>
    </Box>
  );
};
