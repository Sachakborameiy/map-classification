import React from "react";
import InputField from "../custom/inputfields"; 

interface FamilyInformationProps {
    inputs: Record<string, any>;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    errors: Record<string, any>;
    fieldTitles: Record<string, string>;
}

const FamilyInformation: React.FC<FamilyInformationProps> = ({
    inputs,
    handleInputChange,
    errors,
    fieldTitles,
}) => {
    return (
        <div className="col-span-6 flex flex-col">
            <fieldset className="m-5 bg-white border border-gray-300 rounded-lg py-4 px-4 shadow-md sm:rounded-lg">
                <legend className="text-sm font-semibold text-[#1B3351] px-2">ព័ត៌មានគ្រួសារ</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* num_family Input */}
                    <InputField
                        id="num_family"
                        label={fieldTitles["num_family"]}
                        value={inputs.num_family}
                        onChange={handleInputChange}
                        error={errors.num_family}
                        placeholder={`បញ្ចូល ${fieldTitles["num_family"]}`}
                    />

                    {/* L_Map_percentage Input */}
                    <InputField
                        id="L_Map_percentage"
                        label={fieldTitles["L_Map_percentage"]}
                        value={inputs.L_Map_percentage}
                        onChange={handleInputChange}
                        error={errors.L_Map_percentage}
                        placeholder={`បញ្ចូល ${fieldTitles["L_Map_percentage"]}`}
                    />
                    
                    {/* class Input */}
                    <InputField
                        id="class"
                        label={fieldTitles["class"]}
                        value={inputs.class}
                        onChange={handleInputChange}
                        error={errors.class}
                        placeholder={`បញ្ចូល ${fieldTitles["class"]}`}
                    />

                    {/* level_location Input */}
                    <InputField
                        id="level_location"
                        label={fieldTitles["level_location"]}
                        value={inputs.level_location}
                        onChange={handleInputChange}
                        error={errors.level_location}
                        placeholder={`បញ្ចូល ${fieldTitles["level_location"]}`}
                    />

                    <div className="h-[165px]"></div>
                </div>
            </fieldset>
        </div>
    );
};

export default FamilyInformation;
