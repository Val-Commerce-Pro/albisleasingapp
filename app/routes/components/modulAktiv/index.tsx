import { Switch } from "../switch";
import styles from "./styles.module.css";

type ModulAktiv = {
  getCurrentValue: (isChecked: boolean) => void;
  savedCheckboxValue?: boolean;
};

export const ModulAktiv = ({
  getCurrentValue,
  savedCheckboxValue,
}: ModulAktiv) => {
  return (
    <div className={`sectionContainer ${styles.modulAktiv}`}>
      <div className={`fieldAndLabelContainer`}>
        <label className={`fieldLabel`}>Albis Leasing Modul Aktiv:</label>
        <Switch
          getCurrentValue={getCurrentValue}
          savedCheckboxValue={savedCheckboxValue}
        />
      </div>
    </div>
  );
};
