import { PageTitle } from "../components/pagetitle";
import { SectionLeasingData } from "../components/sectionLeasingData";
import { SectionInfoCompany } from "../components/sectionInfoCompany";
import { SectionCompanyManager } from "../components/sectionCompanyManager";

export const AlbisRequest = () => {

  return (

    <div className="max-w-[1280px] shadow-sm mx-auto p-4">
      <PageTitle title="Albis Leasing Request" />
      <SectionLeasingData />
      <form>
        <div className="mt-5">
          <SectionInfoCompany />
        </div>
        <div className="mt-5">
          <SectionCompanyManager />
        </div>

        <div className="p-3 flex">
          <input type="checkbox" id="datenschutz" name="datenschutz" required className="mr-4"/>
          <label htmlFor="datenschutz">Die Datenschutzbestimmungen habe ich zur Kenntnis genommen und bin einverstanden, dass meine Daten an die ALBIS Leasing Gruppe weitergegeben und gemäß der Datenschutzerklärung der ALBIS Leasing Gruppe dort verarbeitet werden.</label>
        </div>
        <input type="submit" className="text-white font-bold bg-orange-400 rounded-md p-3 w-[250px] hover:bg-orange-300"/>
      </form>
    </div>
  );
};

export default AlbisRequest;
