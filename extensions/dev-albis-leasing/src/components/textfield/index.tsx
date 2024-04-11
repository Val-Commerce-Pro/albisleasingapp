import type { ChangeEvent } from "react";

type TextFieldProps = {
  label: string;
  name: string;
  textFieldValue: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur: () => void;
  handleKeyDown: () => void;
  required?: boolean;
  type?: "text" | "password" | "number" | "tel" | "email" | "date" | "radio";
  hidden?: boolean;
  disabled?: boolean;
};

export const TextField = ({
  label,
  name,
  type = "text",
  hidden = false,
  textFieldValue,
  required = false,
  disabled = false,
  handleOnChange,
  handleOnBlur,
  handleKeyDown,
}: TextFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className={``}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        className={`w-full p-3 border rounded-md border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 ${hidden ? "hidden" : "visible"}`}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        onKeyDown={(e) => e.key === "Enter" && handleKeyDown()}
        value={textFieldValue}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};
