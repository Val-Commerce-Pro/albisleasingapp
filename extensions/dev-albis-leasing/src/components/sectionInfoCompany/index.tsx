import { ChangeEvent, useState } from "react";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";

export const SectionInfoCompany = () => {
  const [companyFormData, setCompanyFormData] = useState({
    rechtsform: "",
    firmenname: "",
    strasse: ``,
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    console.log("name, value Input", name, value);
    setCompanyFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    console.log("name, value Select", name, value);
    setCompanyFormData((prev) => ({ ...prev, [name]: value }));
  }
  function handleSave() {
    console.log("should save on the local storage");
  }
  return (
    <Box title="Angaben über die Firma">
      <Select
        handleChange={handleSelectChange}
        name="rechtsform"
        label="Rechtsform"
        selectedValue={companyFormData.rechtsform}
        options={[
          { id: "Herr", bezeichnung: "Herr" },
          { id: "Frau", bezeichnung: "Frau" },
        ]}
        required
      />
      <TextField
        name="firmenname"
        label="Firmenname"
        type="text"
        handleOnChange={handleInputChange}
        handleOnBlur={handleSave}
        handleKeyDown={handleSave}
        textFieldValue={companyFormData.firmenname}
        required
      />
      <TextField
        name="strasse"
        label="Strasse"
        type="text"
        handleOnChange={handleInputChange}
        handleOnBlur={handleSave}
        handleKeyDown={handleSave}
        textFieldValue={companyFormData.strasse}
      />
    </Box>
  );
};
