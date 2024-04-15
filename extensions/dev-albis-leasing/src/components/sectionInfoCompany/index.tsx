import { ChangeEvent, useEffect, useState } from "react";
import { Rechtsformen } from "../../types/albisMethods";
import { LocalStorageI } from "../../types/localStorage";
import { getAlbisMethodsData } from "../../utils/getAlbisMethodsData";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";

export const SectionInfoCompany = () => {
  const [rechtsformen, setRechtsformen] = useState<Rechtsformen | undefined>();
  const [companyFormData, setCompanyFormData] = useState({
    rechtsform: "",
    firmenname: "",
    strasse: "",
    plz: "",
    ort: "",
    telefon: "",
    email: "",
    bank: "",
  });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCompanyFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setCompanyFormData((prev) => {
      const newState =  {...prev, [name]: value };

      handleSelectSave(newState);
      return newState;
    });
  }

  function handleSelectSave(companyInfoData=companyFormData) {
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? "No data");

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageJSON, companyInfoData }),
    );
  }

  function handleSave() {
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? "");

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageJSON, companyInfoData: companyFormData }),
    );
  }

  const fetchRechtsformen = async () => {
    const rechtsformData: Rechtsformen =
      await getAlbisMethodsData("getRechtsformen");
    setRechtsformen(rechtsformData);
  };

  useEffect(() => {
    fetchRechtsformen();
  }, []);

  return (
    <Box title="Angaben über die Firma">
      <div className="overflow-x-auto shadow-md sm:rounded-lg p-3 flex flex-col gap-4">
        {rechtsformen && (
          <Select
            handleChange={handleSelectChange}
            name="rechtsform"
            label="Rechtsform"
            selectedValue={companyFormData.rechtsform}
            options={rechtsformen.result}
            required
          />
        )}
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
          required
        />
        <TextField
          name="plz"
          label="Postleitzahl"
          type="number"
          pattern="[0-9]{5}"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyFormData.plz}
          required
        />
        <TextField
          name="ort"
          label="Ort"
          type="text"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyFormData.ort}
          required
        />
        <TextField
          name="telefon"
          label="Telefon"
          type="tel"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          required
        />
        <TextField
          name="email"
          label="E-Mail"
          type="email"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyFormData.email}
          required
        />
        <TextField
          name="bank"
          label="Bankverbindung"
          type="text"
          pattern="[A-Z0-9]{22}"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyFormData.bank}
          required
        />
      </div>
    </Box>
  );
};
