import React from "react";

type InputFieldProps = {
  id: string;
  label: string;
  value: string;
};

const InputField: React.FC<InputFieldProps> = ({ id, label, value }) => {
  return (
    <div className="w-full md:w-1/3">
      <label htmlFor={id} className="text-sm font-medium text-[#1B3351]">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={id}
        value={value}
        readOnly
        className="input-disable"
        disabled
      />
    </div>
  );
};

export default InputField;
