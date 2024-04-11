import { PageTitle } from "../components/pagetitle";
import { SectionLeasingData } from "../components/sectionLeasingData";
import { SectionInfoCompany } from "../components/sectionInfoCompany";
import { SectionCompanyManager } from "../components/sectionCompanyManager";
import { LocalStorageI } from "../types/localStorage";
import { ChangeEvent } from "react";

export const AlbisRequest = () => {

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    console.log('DATENSCHUTZ', checked)
    const localStorageData = localStorage.getItem("cp@albisLeasing");
    const localStorageJSON: LocalStorageI = JSON.parse(localStorageData ?? "No data"); // TODO: localStorageData && testeb

    localStorage.setItem(
      "cp@albisLeasing",
      JSON.stringify({ ...localStorageJSON, "datenschutz": checked}),
    );
  }

  return (

    <div className="max-w-[1280px] shadow-sm mx-auto p-4">
      <PageTitle title="Albis Leasing Request" />
      <SectionLeasingData />
      <form action="">
        <div className="mt-5">
          <SectionInfoCompany />
        </div>
        <div className="mt-5">
          <SectionCompanyManager />
        </div>

        <div className="p-3 flex">
          <input onChange={(e) => handleChange(e)} type="checkbox" id="datenschutz" name="datenschutz" required className="mr-4"/>
          <label htmlFor="datenschutz">Die Datenschutzbestimmungen habe ich zur Kenntnis genommen und bin einverstanden, dass meine Daten an die ALBIS Leasing Gruppe weitergegeben und gemäß der Datenschutzerklärung der ALBIS Leasing Gruppe dort verarbeitet werden.</label>
        </div>
        <input type="submit" className="text-white font-bold bg-orange-400 rounded-md p-3 w-[250px] hover:bg-orange-300"/>
      </form>
    </div>
  );
};

export default AlbisRequest;
