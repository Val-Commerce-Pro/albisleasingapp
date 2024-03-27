import type { ChangeEvent } from "react";
import { cn } from "../../utils/tailwindMerge";
// import { Label } from "../label";
// import styles from "./styles.module.css";

type TextFieldProps = {
  label: string;
  name: string;
  textFieldValue: string;
  handleOnChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleOnBlur: () => void;
  handleKeyDown: () => void;
  error?: boolean;
  success?: boolean;
  required?: boolean;
  type?: "text" | "password";
  hidden?: boolean;
};

export const TextField = ({
  label,
  name,
  type = "text",
  hidden = false,
  textFieldValue,
  required = false,
  error = false,
  success = false,
  handleOnChange,
  handleOnBlur,
  handleKeyDown,
}: TextFieldProps) => {
  return (
    // <div className={styles.textFieldContainer}>
    //   <Label label={label} />
    //   <input
    //     id={name}
    //     name={name}
    //     type={type}
    //     className={styles.textField}
    //     onChange={handleOnChange}
    //     onBlur={handleOnBlur}
    //     onKeyDown={(e) => e.key === "Enter" && handleKeyDown()}
    //     value={textFieldValue}
    //     style={{ visibility: hidden ? "hidden" : "visible" }}
    //     required={required}
    //   />
    // </div>
    <div className="flex flex-col gap-6 w-72">
      <div className="relative h-10 w-full min-w-[200px]">
        <input
          id={name}
          name={name}
          type={type}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          onKeyDown={(e) => e.key === "Enter" && handleKeyDown()}
          value={textFieldValue}
          style={{ visibility: hidden ? "hidden" : "visible" }}
          required={required}
          placeholder={"€500"}
          className={cn(
            `peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100`,
            error && ` focus:border-red-600`,
            success && `focus:border-green-600`,
          )}
        />

        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          {label}
        </label>
      </div>
    </div>
  );
};
