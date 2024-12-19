import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface TableProps {
  data: any[];
  onDelete: (index: number) => void;
}

const ViewPage: React.FC<TableProps> = ({ data, onDelete }) => {
  // Define the column headers for your fields and map them to the data field names
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
    { label: "Number of Families", key: "num_family" },
    { label: "L-Map Percentage", key: "L_Map_percentage" },
    { label: "Class", key: "class" },
    { label: "Location Level", key: "level_location" },
    { label: "Agricultural Land (A1)", key: "A1" },
    { label: "Agricultural Land (A2)", key: "A2" },
    { label: "Agricultural Land (A3)", key: "A3" },
    { label: "Commercial Land (C1)", key: "C1" },
    { label: "Commercial Land (C2)", key: "C2" },
    { label: "Commercial Land (C3)", key: "C3" },
    { label: "Residential Land (R1)", key: "R1" },
    { label: "Residential Land (R2)", key: "R2" },
    { label: "Residential Land (R3)", key: "R3" },
    { label: "Industrial Land (I1)", key: "I1" },
    { label: "Industrial Land (I2)", key: "I2" },
    { label: "Industrial Land (I3)", key: "I3" },
  ];

  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(
    Object.fromEntries(columnHeaders.map((_, index) => [index, 120])) // Default width for all columns
  );

  const handleResize = (index: number, deltaX: number) => {
    setColumnWidths((prev) => {
      const newWidths = { ...prev };
      newWidths[index] = Math.max(newWidths[index] + deltaX, 50); // Minimum width: 50px
      return newWidths;
    });
  };

  const handleMouseDown = (e: React.MouseEvent, index: number) => {
    const startX = e.clientX;
    const currentWidth = columnWidths[index];

    const onMouseMove = (event: MouseEvent) => {
      const deltaX = event.clientX - startX;
      handleResize(index, deltaX);
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const handleSelectRow = (rowId: number) => {
    setSelectedRows((prevSelected) => {
      if (prevSelected.includes(rowId)) {
        return []; // Deselect if already selected
      } else {
        return [rowId]; // Only select one row at a time
      }
    });
  };

  return (
    <div className="rounded-lg bg-white shadow-lg">
      <div className="w-full mx-auto px-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2" style={{ height: '165px' }}>
          {data.length === 0 ? (
            <p className="text-gray-500 text-center m-20">No data available. Please add data first.</p>
          ) : (
            <table className="min-w-full table-auto border-separate border border-gray-300 rounded-lg">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th
                    className="p-2 text-left text-xs font-medium text-gray-700 whitespace-nowrap"
                    style={{ width: columnWidths[0] }}
                  >
                    All
                  </th>
                  {columnHeaders.map((header, index) => (
                    <th
                      key={index}
                      className="relative p-2 text-left text-xs font-medium text-gray-700 whitespace-nowrap"
                      style={{ width: columnWidths[index + 1] }}
                    >
                      <div className="flex justify-between items-center">
                        {header.label}
                        <div
                          className="absolute top-0 right-0 w-2 h-full cursor-col-resize"
                          onMouseDown={(e) => handleMouseDown(e, index + 1)}
                        />
                      </div>
                    </th>
                  ))}
                  <th
                    className="p-2 text-left text-xs font-medium text-gray-700 whitespace-nowrap"
                    style={{ width: columnWidths[columnHeaders.length + 1] }}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-[#284870] hover:text-white ${
                      selectedRows.includes(item.id) ? "hover:bg-[#284870] hover:text-white" : "hover:bg-[#284870] hover:text-white"
                    }`}
                  >
                    <td
                      className="border-b bg-gray-100 cursor-pointer"
                      style={{ width: columnWidths[0] }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                        className="h-3 w-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                    {columnHeaders.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className="border-b bg-gray-100 cursor-pointer"
                        style={{ width: columnWidths[colIndex + 1] }}
                      >
                        {/* Access the data by the corresponding field key */}
                        {item[header.key] || "-"} 
                      </td>
                    ))}
                    <td
                      className="border-b bg-gray-100 cursor-pointer"
                      style={{ width: columnWidths[columnHeaders.length + 1] }}
                    >
                      <div className="flex justify-end">
                        <button
                          className="p-1 text-blue-500 hover:text-blue-700"
                          aria-label="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDelete(index)}
                          className="p-1 text-red-500 hover:text-red-700"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPage;
