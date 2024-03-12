import type { ChangeEvent } from "react";
import { useState } from "react";
import styles from "./styles.module.css";

type Switch = {
  getCurrentValue: (isChecked: boolean) => void;
  savedCheckboxValue?: boolean;
};

export const Switch = ({ getCurrentValue, savedCheckboxValue }: Switch) => {
  const [isChecked, setIsChecked] = useState<boolean>(
    savedCheckboxValue ?? false,
  );

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.checked;
    getCurrentValue(currentValue);
    setIsChecked(currentValue);
  };

  return (
    <div className={styles.toggleSwitch}>
      <span className={styles.toggleTextOff}>Off</span>
      <input
        type="checkbox"
        id="toggle"
        className={styles.toggleCheckbox}
        onChange={handleOnChange}
        checked={isChecked}
      />
      <label className={styles.toggleLabel} htmlFor="toggle">
        <span className={styles.toggleInner}></span>
        <span className={styles.toggleSwitch}></span>
      </label>
      <span className={styles.toggleTextOn}>On</span>
    </div>
  );
};
