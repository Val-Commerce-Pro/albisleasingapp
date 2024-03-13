import type { ChangeEvent } from "react";
import { Label } from "../label";
import styles from "./styles.module.css";

type TextField = {
  label: string;
  name: string;
  textFieldValue: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur?: () => void;
  type?: "text" | "password";
  hidden?: boolean;
};

export const TextField = ({
  label,
  name,
  type = "text",
  hidden = false,
  textFieldValue,
  handleOnChange,
  handleOnBlur,
}: TextField) => {
  return (
    <div className={styles.textFieldContainer}>
      <Label label={label} />
      <input
        id={name}
        name={name}
        type={type}
        className={styles.textField}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        value={textFieldValue}
        style={{ visibility: hidden ? "hidden" : "visible" }}
      />
    </div>
  );
};
