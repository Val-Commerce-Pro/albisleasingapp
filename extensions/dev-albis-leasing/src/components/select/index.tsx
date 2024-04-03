import React from "react";
import { Label } from "../label";

type SelectProps = {
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedValue?: string;
  name: string;
  label?: string;
  options: Array<{ value: string; label: string }>;
};

export const Select = ({
  handleChange,
  selectedValue,
  label,
  name,
  options,
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <Label label={label} />}
      <select
        name={name}
        id={name}
        onChange={handleChange}
        value={selectedValue}
        className="block w-full px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
