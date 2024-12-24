"use client";
import React from "react";
import { Edit, Trash2 } from "lucide-react";
import Title from "../components/custom/header-title";
import { useRouter } from "next/navigation";
import ButtonGroup from "../components/custom/PreviewDataButton";

const columnHeaders = [
  { label: "Branches", key: "branches" },
  { label: "Branch Code", key: "branch_code" },
  { label: "Province/City", key: "province_city" },
  { label: "Province/City Code", key: "province_city_code" },
  { label: "District/Khan/Krong", key: "district_khan_krong" },
  { label: "District/Khan/Krong Code", key: "district_khan_krong_code" },
  { label: "Commune/Sangket", key: "commune_sangket" },
  { label: "Commune/Sangket Code", key: "commune_sangket_code" },
  { label: "Village", key: "village" },
  { label: "Village Code", key: "village_code" },
  { label: "Phone Commune/Sangket", key: "phone_commune_sangket" },
  { label: "Phone Village Chief", key: "phone_village_chief" },
  { label: "Name Chief Sangket", key: "cheif_name_sangket" },
  { label: "Name Chief Village", key: "cheif_name_village" },
  { label: "Number of Families", key: "num_family" },
  { label: "L-Map Percentage", key: "L_Map_percentage" },
  { label: "Class", key: "class" },
  { label: "Location Level", key: "level_location" },
];

interface TableProps {
  data: any[];
  onDelete: (index: number) => void;
}

const ViewPage: React.FC<TableProps> = ({ data = [], onDelete }) => {
  const router = useRouter();
  const handleBack = () => router.push("/import-data");

  return (
    <div className="flex flex-col m-auto fixed w-full">
      <Title />
      <div className="py-0 w-full h-full overflow-auto">
        <div className="border-l-2 border-r-2 border-t-2 shadow-md rounded-sm p-2 w-full overflow-auto">
          <ButtonGroup handleBack={handleBack} />
          <div className="w-full min-h-screen flex flex-col">
            <div className="overflow-x-auto shadow-md sm:rounded-lg mx-4 flex-grow">
              <table className="min-w-full border border-gray-300 rounded-lg" style={{ borderCollapse: "collapse" }}>
                <thead className="bg-[#0b2c5e] sticky top-0 z-10">
                  <tr>
                    <th className="border p-3 text-left text-xs font-medium text-white" style={{ width: "2em" }}>
                      No.
                    </th>
                    {columnHeaders.map((header, index) => (
                      <th
                        key={index}
                        className="border p-3 text-left text-xs font-medium text-gray-700"
                        style={{ width: "200px", whiteSpace: "nowrap" }}
                      >
                        {header.label}
                      </th>
                    ))}
                    <th className="border p-3 text-left text-xs font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length === 0 ? (
                    <tr>
                      <td colSpan={columnHeaders.length + 2} className="border p-4 text-center text-gray-500">
                        No data available. Please add data.
                      </td>
                    </tr>
                  ) : (
                    data.map((item, index) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="border p-3 text-center">{index + 1}</td>
                        {columnHeaders.map((header, colIndex) => (
                          <td key={colIndex} className="border p-3" style={{ whiteSpace: "nowrap" }}>
                            {item[header.key] || "-"}
                          </td>
                        ))}
                        <td className="border p-3">
                          <div className="flex justify-end gap-2">
                            <button className="text-blue-500 hover:text-blue-700" aria-label="Edit">
                              <Edit className="w-5 h-5" />
                            </button>
                            <button onClick={() => onDelete(index)} className="text-red-500 hover:text-red-700" aria-label="Delete">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
