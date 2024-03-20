import type { ChangeEvent } from "react";
import { Label } from "../label";
import styles from "./styles.module.css";

export type OptionsMethodData = Array<{
  id: string;
  labelValue: string;
  selected?: boolean;
}>;

type SelectProps = {
  label: string;
  name: string;
  handleOnChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  optionsData: OptionsMethodData;
  required?: boolean;
};

export const Select = ({
  label,
  name,
  optionsData,
  handleOnChange,
  required = false,
}: SelectProps) => {
  return (
    <div className={styles.textFieldContainer}>
      <Label label={label} />
      <select
        id={name}
        name={name}
        className={styles.textField}
        onChange={handleOnChange}
        required={required}
      >
        <option value="" disabled selected>
          Please select an option
        </option>
        {optionsData &&
          optionsData.map((item) => (
            <option
              key={`id-${item.id}`}
              value={item.labelValue}
              selected={item?.selected}
            >
              {item.labelValue}
            </option>
          ))}
      </select>
    </div>
  );
};
