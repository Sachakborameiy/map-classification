import React from "react";

interface DropdownFieldProps {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
  placeholder?: string;
}

const DropdownField: React.FC<DropdownFieldProps> = ({
  id,
  label,
  options,
  value,
  onChange,
  error,
  placeholder = "Please select",
}) => (
  <div className="w-full">
    <label htmlFor={id} className="text-sm font-medium text-[#1B3351]">
      {label}
    </label>
    <select
      id={id}
      name={id}
      onChange={onChange}
      value={value}
      className="dropdown-global"
    >
      <option value="">{placeholder}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

export default DropdownField;
