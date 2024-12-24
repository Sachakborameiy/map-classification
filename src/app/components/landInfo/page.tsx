// src/components/LandType/page.tsx
import React from 'react';

interface LandTypeProps {
  inputs: { [key: string]: string };
  handleInputChangeTextArea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const LandType: React.FC<LandTypeProps> = ({ inputs, handleInputChangeTextArea }) => {
  const landTypes = [
    { field: "C1", label: "ដីពាណិជ្ជកម្ម C1", placeholder: "បញ្ចូលដីពាណិជ្ជកម្ម C1..." },
    { field: "R1", label: "ដីលំនៅឋាន R1", placeholder: "បញ្ចូលដីលំនៅឋាន R1..." },
    { field: "I1", label: "ដីឧស្សាហកម្ម I1", placeholder: "បញ្ចូលដីឧស្សាហកម្ម I1..." },
    { field: "A1", label: "ដីកសិកម្ម A1", placeholder: "បញ្ចូលដីកសិកម្ម A1..." },
    { field: "C2", label: "ដីពាណិជ្ជកម្ម C2", placeholder: "បញ្ចូលដីពាណិជ្ជកម្ម C2..." },
    { field: "R2", label: "ដីលំនៅឋាន R2", placeholder: "បញ្ចូលដីលំនៅឋាន R2..." },
    { field: "I2", label: "ដីឧស្សាហកម្ម I2", placeholder: "បញ្ចូលដីឧស្សាហកម្ម I2..." },
    { field: "A2", label: "ដីកសិកម្ម A2", placeholder: "បញ្ចូលដីកសិកម្ម A2..." },
    { field: "C3", label: "ដីពាណិជ្ជកម្ម C3", placeholder: "បញ្ចូលដីពាណិជ្ជកម្ម C3..." },
    { field: "R3", label: "ដីលំនៅឋាន R3", placeholder: "បញ្ចូលដីលំនៅឋាន R3..." },
    { field: "I3", label: "ដីឧស្សាហិកម I3", placeholder: "បញ្ចូលដីឧស្សាហិកម I3..." },
    { field: "A3", label: "ដីកសិកម្ម A3", placeholder: "បញ្ចូលដីកសិកម្ម A3..." },
  ];

  return (
    <fieldset className="bg-white w-full border border-gray-300 rounded-lg shadow-md sm:rounded-lg">
      <legend className="text-sm font-semibold text-[#1B3351] px-6">ប្រភេទដី</legend>
      <div className="grid grid-cols-4 gap-3 p-4">
        {landTypes.map(({ field, label, placeholder }) => (
          <div key={field} className="flex flex-col">
            <label htmlFor={field} className="text-sm font-medium text-[#1B3351]">{label}</label>
            <textarea
              id={field}
              name={field}
              value={inputs[field as keyof typeof inputs]}
              onChange={handleInputChangeTextArea}
              placeholder={placeholder}
              className="bg-[#FFFFFF] h-16 input-global"
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default LandType;
