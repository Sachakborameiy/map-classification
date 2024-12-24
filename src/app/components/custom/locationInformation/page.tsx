import React from "react";
import DropdownField from "../dropdown";
import InputField from "../inputfields";
import { provinceCity } from "@/app/constant/data";

interface LocationInformationProps {
    selected: SelectedType;
    handleChange: (field: keyof SelectedType) => (event: React.ChangeEvent<HTMLSelectElement>) => void;
    getOptions: (field: keyof SelectedType) => string[];
    errors: Record<string, any>;
    fieldTitles: Record<string, string>;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputs: Record<string, any>;
}

interface SelectedType {
    province: string;
    district: string;
    commune: string;
    village: string;
    branch: string;
    provinceCode: string;
    districtCode: string;
    communeCode: string;
    villageCode: string;
    branchCode: string;
  }
  

const LocationInformation: React.FC<LocationInformationProps> = ({
    selected,
    handleChange,
    getOptions,
    errors = {},
    fieldTitles,
    handleInputChange,
    inputs = {},
}) => {
    return (
        <div className="col-span-6 flex flex-col">
            <fieldset className="border border-gray-300 rounded-lg px-1 py-3 pt-0 md:px-2 bg-white shadow-md sm:rounded-lg">
                <legend className="text-base font-semibold text-[#1B3351] px-4">ទីតាំង</legend>
                <div className="grid grid-cols-1 md:grid-cols-12 rounded-md gap-4 py-0 px-1">
                    {/* Left Section */}
                    <div className="col-span-1 md:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-2 ">
                        {/* Row 1 */}
                        <div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
                            <DropdownField
                                id="province"
                                label={fieldTitles.provinceCity}
                                options={Object.keys(provinceCity)}
                                value={selected.province}
                                onChange={handleChange("province")}
                                error={errors.provinceCity}
                                placeholder="ជ្រើសរើសតារាង"
                            />
                            <InputField
                                id="province_code"
                                label="លេខកូដខេត្ត/រាជធានី"
                                value={selected.provinceCode}
                                onChange={handleInputChange}
                                readOnly
                                disabled
                            />
                        </div>

                        {/* Row 2 */}
                        <div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
                            <DropdownField
                                id="district"
                                label={fieldTitles.district}
                                options={getOptions("district")}
                                value={selected.district}
                                onChange={handleChange("district")}
                                error={errors.district}
                                placeholder="ជ្រើសរើសតារាង"
                            />
                            <InputField
                                id="district_code"
                                label="លេខកូដស្រុក"
                                value={selected.districtCode}
                                onChange={handleInputChange}
                                readOnly
                                disabled
                            />
                        </div>

                        {/* Row 3 */}
                        <div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
                            <DropdownField
                                id="commune"
                                label={fieldTitles.commune}
                                options={getOptions("commune")}
                                value={selected.commune}
                                onChange={handleChange("commune")}
                                error={errors.commune}
                                placeholder="ជ្រើសរើសតារាង"
                            />
                            <InputField
                                id="commune_code"
                                label="លេខកូដឃំុ/សង្កាត់"
                                value={selected.communeCode}
                                onChange={handleInputChange}
                                readOnly
                                disabled
                            />
                        </div>

                        {/* Row 4 */}
                        <div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
                            <DropdownField
                                id="village"
                                label={fieldTitles.village}
                                options={getOptions("village")}
                                value={selected.village}
                                onChange={handleChange("village")}
                                error={errors.village}
                                placeholder="ជ្រើសរើសតារាង"
                            />
                            <InputField
                                id="village_code"
                                label="លេខកូដភូមិ"
                                value={selected.villageCode}
                                onChange={handleInputChange}
                                readOnly
                                disabled
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="col-span-1 md:col-span-6 grid grid-cols-1 md:grid-cols-6 gap-1">
                        {/* Branch Selection */}
                        <div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2 mt-16">
                            <DropdownField
                                id="branches"
                                label={fieldTitles.branches}
                                options={getOptions("branch")}
                                value={selected.branch}
                                onChange={handleChange("branch")}
                                error={errors.branches}
                                placeholder="ជ្រើសរើសតារាង"
                            />
                            <InputField
                                id="branch_code"
                                label="លេខកូដសាខា"
                                value={selected.branchCode}
                                onChange={handleInputChange}
                                readOnly
                                disabled
                            />
                        </div>

                        {/* Phone Inputs */}
                        <div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
                            <InputField
                                id="phone_commune_sangket"
                                label={fieldTitles.phone_commune_sangket}
                                value={inputs.phone_commune_sangket}
                                onChange={handleInputChange}
                                placeholder={`បញ្ចូល ${fieldTitles.phone_commune_sangket}`}
                                error={errors.phone_commune_sangket}
                            />
                            <InputField
                                id="cheif_name_sangket"
                                label="ឈ្មោះ មេឃុំ/សង្កាត់"
                                value={inputs.cheif_name_sangket}
                                onChange={handleInputChange}
                                placeholder="បញ្ចូល ឈ្មោះមេឃុំ/សង្កាត់"
                                error={errors.cheif_name_sangket}
                            />
                        </div>  

                        <div className="flex flex-col md:flex-row items-start md:items-center col-span-1 md:col-span-6 gap-2">
                            <InputField
                                id="phone_village_chief"
                                label={fieldTitles.phone_village_chief}
                                value={inputs.phone_village_chief}
                                onChange={handleInputChange}
                                placeholder={`បញ្ចូល ${fieldTitles.phone_village_chief}`}
                                error={errors.phone_village_chief}
                            />
                            <InputField
                                id="cheif_name_village"
                                label="ឈ្មោះ មេភូមិ"
                                value={inputs.cheif_name_village}
                                onChange={handleInputChange}
                                placeholder="បញ្ចូល ឈ្មោះមេភូមិ"
                                error={errors.cheif_name_village}
                            />
                        </div>
                    </div>
                </div>
            </fieldset>
        </div>
    );
};

export default LocationInformation;
