import React from "react";

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  error,
  placeholder = "",
  readOnly = false,
  disabled = false,
}) => (
  <div className="w-full">
    <label htmlFor={id} className="text-sm font-medium text-[#1B3351]">
      {label}
    </label>
    <input
      type="text"
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input-global ${readOnly ? "input-disable" : ""}`}
      readOnly={readOnly}
      disabled={disabled}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

export default InputField;
