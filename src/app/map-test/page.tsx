import React from "react";

interface TableProps {
  data: any[];
  onDelete: (index: number) => void;
}

const Table: React.FC<TableProps> = ({ data, onDelete }) => {
  return (
    <table className="w-full border-collapse border">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2">Field 1</th>
          <th className="border p-2">Field 2</th>
          <th className="border p-2">Field 3</th>
          <th className="border p-2">Field 4</th>
          <th className="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="text-center">
            <td className="border p-2">{row.field1}</td>
            <td className="border p-2">{row.field2}</td>
            <td className="border p-2">{row.field3}</td>
            <td className="border p-2">{row.field4}</td>
            <td className="border p-2">
              <button
                onClick={() => onDelete(index)}
                className="py-1 px-3 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
