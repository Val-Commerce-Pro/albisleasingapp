import { useEffect } from "react";
import { PageTitle } from "../components/pagetitle";
import { SectionLeasingData } from "../components/sectionLeasingData";

export const AlbisRequest = () => {
  console.log("AlbisRequest render");

  useEffect(() => {
    const localStorageDataAsString = localStorage.getItem("cp@AlbisLeasing");
    console.log("localStorageDataAsString", localStorageDataAsString);
  }, []);

  return (

    <div className="max-w-[1280px] mx-auto p-4">
    <PageTitle title="Albis Leasing Request" />
    <SectionLeasingData />
    </div>
  );
};

export default AlbisRequest;
