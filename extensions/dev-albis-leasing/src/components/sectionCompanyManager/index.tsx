import { ChangeEvent, useState } from "react";
import { CompanyManagerInfoData, LocalStorageI } from "../../types/localStorage";
import { Box } from "../box";
import { Select } from "../select";
import { TextField } from "../textfield";
import { isDate21orMoreYearsOld } from "../../utils/formValidation";

export const SectionCompanyManager = () => {
    const initialState: CompanyManagerInfoData =  {
        anrede: "1",
        vorname: "",
        nachname: "",
        strasseGF: "",
        plzGF: "",
        ortGF: "",
        telGF: "",
        geburtsdatum: "",  
    }
  const [companyManagerFormData, setCompanyManagerFormData] = useState( () => {
    const storageDataAsString = localStorage.getItem("cp@albisLeasing");
    const stateInitialData: CompanyManagerInfoData =
      storageDataAsString && Object.keys(storageDataAsString).length > 1
        ? { ...JSON.parse(storageDataAsString).companyManagerInfoData } : initialState
        return stateInitialData;
    });

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setCompanyManagerFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name, value } = event.target;
    setCompanyManagerFormData((prev) => {
        const newState =  {...prev, [name]: value };
  
        handleSelectSave(newState);
        return newState;
      });
    }
  
    function handleSelectSave(companyManagerInfoData=companyManagerFormData) {
      const localStorageData = localStorage.getItem("cp@albisLeasing");
      const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? initialState.toString());
  
      localStorage.setItem(
        "cp@albisLeasing",
        JSON.stringify({ ...localStorageJSON, companyManagerInfoData }),
      );
    }

  function handleSave() {
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(
      localStorageData ?? initialState.toString(),
    );

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageJSON, companyManagerInfoData: companyManagerFormData }),
    );
  }

  return (
    <Box title="Angaben zum Geschäftsführer">
      <div className="overflow-x-auto shadow-md sm:rounded-lg p-[12px] flex flex-col gap-[16px]">
        <Select
          handleChange={handleSelectChange}
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
          name="telGF"
          label="Telefon (GF)"
          type="tel"
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          textFieldValue={companyManagerFormData.telGF}
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
          max={isDate21orMoreYearsOld()}
          handleOnChange={handleInputChange}
          handleOnBlur={handleSave}
          handleKeyDown={handleSave}
          required
        />
      </div>
    </Box>
  );
};
