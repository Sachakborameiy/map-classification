"use client";
import { useState, useEffect } from "react";
import {
  provinceCity,
  communeSangkat,
  branch,
  villages,
  provinceCityCode,
  districtCode,
  communeCode,
  villageCode,
  branchCode,
} from "../constant/data";

type ProvinceCityType = {
  [key: string]: {
    districts: {
      name: string;
      communes: string[];
    }[];
  };
};

type CommuneSangkatType = {
  [key: string]: {
    villages: string[];
  };
};

type BranchType = {
  [key: string]: string;
};

type SelectedType = {
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
};

const Page = () => {
  const [selected, setSelected] = useState<SelectedType>({
    province: "",
    district: "",
    commune: "",
    village: "",
    branch: "",
    provinceCode: "",
    districtCode: "",
    communeCode: "",
    villageCode: "",
    branchCode: "",
  });

  // Handle changes for each selector independently
  const handleChange =
    (field: keyof SelectedType) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      const value = event.target.value;
      setSelected((prev) => {
        const updatedSelection: SelectedType = {
          ...prev,
          [field]: value,
        };

        // When province is changed, reset dependent fields
        if (field === "province") {
          updatedSelection.district = "";
          updatedSelection.commune = "";
          updatedSelection.village = "";
          updatedSelection.branch = "";
          updatedSelection.districtCode = "";
          updatedSelection.communeCode = "";
          updatedSelection.villageCode = "";
          updatedSelection.branchCode = "";
          updatedSelection.provinceCode =
            provinceCityCode[value as keyof typeof provinceCityCode] || "";
        }

        // When district is changed, reset dependent fields
        if (field === "district") {
          updatedSelection.commune = "";
          updatedSelection.village = "";
          updatedSelection.branch = "";
          updatedSelection.communeCode = "";
          updatedSelection.villageCode = "";
          updatedSelection.branchCode = "";
          updatedSelection.districtCode =
            districtCode[value as keyof typeof districtCode] || "";
        }

        // When commune is changed, reset dependent fields
        if (field === "commune") {
          updatedSelection.village = "";
          updatedSelection.branch = "";
          updatedSelection.villageCode = "";
          updatedSelection.branchCode = "";
          updatedSelection.communeCode =
            communeCode[value as keyof typeof communeCode] || "";
        }

        // When village is changed, reset branch
        if (field === "village") {
          updatedSelection.branch = "";
          updatedSelection.branchCode = "";
          updatedSelection.villageCode =
            villageCode[value as keyof typeof villageCode] || "";
        }

        // When branch is changed, reset branchCode
        if (field === "branch") {
          updatedSelection.branchCode = branchCode[value as keyof typeof branchCode] || "";
        }

        return updatedSelection;
      });
    };

  // Get options for each dropdown
  const getOptions = (field: keyof SelectedType): string[] => {
    switch (field) {
      case "district":
        return selected.province
          ? (provinceCity as ProvinceCityType)[selected.province]?.districts.map((d) => d.name) || []
          : [];
      case "commune":
        return selected.district
          ? (provinceCity as ProvinceCityType)[selected.province]?.districts
              .find((d) => d.name === selected.district)
              ?.communes || []
          : [];
      case "village":
        return selected.commune
          ? (communeSangkat as CommuneSangkatType)[selected.commune]?.villages || []
          : Object.keys(villages);
      case "branch":
        return Object.keys(branch);
      default:
        return Object.keys(provinceCity as ProvinceCityType);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Location Selector</h1>

      {/* Province Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Province</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          onChange={handleChange("province")}
          value={selected.province}
        >
          <option value="">Select Province</option>
          {Object.keys(provinceCity as ProvinceCityType).map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      {/* District Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">District</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          onChange={handleChange("district")}
          value={selected.district}
        >
          <option value="">Select District</option>
          {getOptions("district").map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Commune Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Commune</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          onChange={handleChange("commune")}
          value={selected.commune}
        >
          <option value="">Select Commune</option>
          {getOptions("commune").map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Village Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Village</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          onChange={handleChange("village")}
          value={selected.village}
        >
          <option value="">Select Village</option>
          {getOptions("village").map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Branch Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Branch</label>
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
          onChange={handleChange("branch")}
          value={selected.branch}
        >
          <option value="">Select Branch</option>
          {getOptions("branch").map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Code Section */}
      <div className="grid grid-cols-2 gap-4">
        {/* Province Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Province Code</label>
          <input
            type="text"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            value={selected.provinceCode}
          />
        </div>

        {/* District Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">District Code</label>
          <input
            type="text"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            value={selected.districtCode}
          />
        </div>

        {/* Commune Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Commune Code</label>
          <input
            type="text"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            value={selected.communeCode}
          />
        </div>

        {/* Village Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Village Code</label>
          <input
            type="text"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            value={selected.villageCode}
          />
        </div>

        {/* Branch Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Branch Code</label>
          <input
            type="text"
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500"
            value={selected.branchCode}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
