import React from "react";

type SelectProps = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  options: Array<{ id: number | string; bezeichnung: string }>;
  label?: string;
  selectedValue?: string;
  disabled?: boolean;
  hidden?: boolean;
  required?: boolean;
};

export const Select = ({
  handleChange,
  name,
  options,
  label,
  selectedValue,
  disabled = false,
  hidden = false,
  required = false,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className={`text-sm`}>{label}</label>}
      <select
        name={name}
        id={name}
        onChange={(e) => handleChange(e)}
        value={selectedValue}
        disabled={disabled}
        required={required}
        className={`block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 ${hidden ? "hidden" : "visible"}`}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.bezeichnung}
          </option>
        ))}
      </select>
    </div>
  );
};
