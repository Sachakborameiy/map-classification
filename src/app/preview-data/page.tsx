"use client";
import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

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

const ViewPage: React.FC<TableProps> = ({ data, onDelete }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [columnWidths, setColumnWidths] = useState(
    Object.fromEntries(columnHeaders.map((_, index) => [index, 150]))
  );

  const handleResize = (index: number, deltaX: number) => {
    setColumnWidths((prev) => ({
      ...prev,
      [index]: Math.max(prev[index] + deltaX, 50), // Minimum width: 50px
    }));
  };

  const handleStartResize = (
    e: React.MouseEvent | React.TouchEvent,
    index: number
  ) => {
    let startX = "clientX" in e ? e.clientX : e.touches[0].clientX;

    const onMove = (event: MouseEvent | TouchEvent) => {
      const currentX = "clientX" in event ? event.clientX : event.touches[0].clientX;
      handleResize(index, currentX - startX);
      startX = currentX;
    };

    const onEnd = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onEnd);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("touchend", onEnd);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onEnd);
    document.addEventListener("touchmove", onMove);
    document.addEventListener("touchend", onEnd);
  };

  const handleSelectRow = (rowId: number) => {
    setSelectedRows((prev) =>
      prev.includes(rowId) ? [] : [rowId] // Only select one row at a time
    );
  };

  return (
    <div className="rounded-lg bg-white shadow-lg">
      <div className="w-full px-4">
        <div
          className="overflow-x-auto shadow-md sm:rounded-lg mt-2"
          style={{ height: "175px" }}
        >
          {data.length === 0 ? (
            <p className="text-gray-500 text-center m-20">
              No data available. Please add data first.
            </p>
          ) : (
            <table
              className="min-w-full border border-gray-300 rounded-lg"
              style={{ tableLayout: "auto", borderCollapse: "collapse" }}
            >
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th
                    className="border p-3 text-left text-xs font-medium text-gray-700"
                    style={{ width: "50px" }}
                  >
                    All
                  </th>
                  {columnHeaders.map((header, index) => (
                    <th
                      key={index}
                      className="relative border p-3 text-left text-xs font-medium text-gray-700"
                      style={{
                        width: columnWidths[index],
                        whiteSpace: "nowrap",
                        position: "relative",
                      }}
                    >
                      <div className="flex justify-between items-center">
                        {header.label}
                        <div
                          className="absolute right-0 top-0 h-full w-2 cursor-col-resize"
                          onMouseDown={(e) => handleStartResize(e, index)}
                          onTouchStart={(e) => handleStartResize(e, index)}
                        />
                      </div>
                    </th>
                  ))}
                  <th className="border p-3 text-left text-xs font-medium text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="border p-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                      />
                    </td>
                    {columnHeaders.map((header, colIndex) => (
                      <td key={colIndex} className="border p-3" style={{ whiteSpace: "nowrap" }}>
                        {item[header.key] || "-"}
                      </td>
                    ))}
                    <td className="border p-3">
                      <div className="flex justify-end gap-2">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          aria-label="Edit"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => onDelete(index)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
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
