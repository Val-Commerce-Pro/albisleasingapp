import { Switch } from "../switch";
import styles from "./styles.module.css";

type ModulAktiv = {
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checkboxValue: boolean;
};

export const ModulAktiv = ({ handleOnChange, checkboxValue }: ModulAktiv) => {
  console.log("modulAkitv", checkboxValue);
  return (
    <div className={`sectionContainer ${styles.modulAktiv}`}>
      <Switch
        name={"modulAktiv"}
        label="Albis Leasing Modul Aktiv:"
        handleOnChange={handleOnChange}
        checkboxValue={checkboxValue}
      />
    </div>
  );
};
