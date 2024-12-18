import React, { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface TableProps {
    data: any[];
    onDelete: (index: number) => void;
    onAddRow: (newRow: any) => void; // Callback to add a row
}

const ViewPage: React.FC<TableProps> = ({ data, onDelete, onAddRow }) => {
    const columnHeaders = [
        "សាខា", "កូដ សាខា", "ខេត្ត/រាជធានី", "កូដ ខេត្ត/រាជធានី", "ស្រុក/ខណ្ឌ/ក្រុង",
        "កូដ ស្រុក/ខណ្ឌ/ក្រុង", "ឃុំ/សង្កាត់", "កូដ ឃុំ/សង្កាត់", "ភូមិ", "កូដ ភូមិ",
        "លេខទូរស័ព្ទ ឃុំ/សង្កាត់", "លេខទូរស័ព្ទ មេភូមិ", "ចំនួន គ្រួសារ", "L-Map (ភាគរយ)",
        "ចំណាត់ថ្នាក់", "កម្រិតទីតាំង", "ដីពាណិជ្ជកម្ម C1", "ដីពាណិជ្ជកម្ម C2", "ដីពាណិជ្ជកម្ម C3",
        "ដីលំនៅឋាន R1", "ដីលំនៅឋាន R2", "ដីលំនៅឋាន R3", "ដីឧស្សាហកម្ម I1", "ដីឧស្សាហកម្ម I2", "ដីឧស្សាហកម្ម I3",
        "ដីកសិកម្ម A1", "ដីកសិកម្ម A2", "ដីកសិកម្ម A3",
    ];

    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [columnWidths, setColumnWidths] = useState<{ [key: string]: number }>(
        Object.fromEntries(columnHeaders.map((_, index) => [index, 150])) // Default width for all columns
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
                // Deselect if already selected
                return [];
            } else {
                // Select the row
                return [rowId]; // Only allow one row to be selected at a time
            }
        });
    };

    const handleAddRow = () => {
        const newRow = { 
            id: Date.now(), // Unique ID for the row
            // Add default values for the row's columns here
            "សាខា": "New Branch", 
            "កូដ សាខា": "0001", 
            "ខេត្ត/រាជធានី": "New Province",
            "កូដ ខេត្ត/រាជធានី": "0001",
            // Add other column default values here...
        };

        onAddRow(newRow); // Call the onAddRow prop to update the data
    };

    return (
        <div className="space-y-2 rounded-lg bg-white shadow-lg">
            <div className="w-full mx-auto px-6 py-0">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2" style={{ height: '200px' }}>
                    {data.length === 0 ? (
                        <p className="text-gray-500">No data available. Please add data first.</p>
                    ) : (
                        <table className="min-w-full table-auto border-separate border border-gray-300 rounded-lg">
                            <thead className="bg-gray-50 sticky top-0 z-10">
                                <tr>
                                    <th
                                        className="p-4 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                                        style={{ width: columnWidths[0] }}
                                    >
                                        {/* Removed "Select All" checkbox */}
                                    </th>
                                    {columnHeaders.map((header, index) => (
                                        <th
                                            key={index}
                                            className="relative p-1 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
                                            style={{ width: columnWidths[index + 1] }}
                                        >
                                            <div className="flex justify-between items-center">
                                                {header}
                                                <div
                                                    className="absolute top-0 right-0 w-2 h-full cursor-col-resize"
                                                    onMouseDown={(e) => handleMouseDown(e, index + 1)}
                                                />
                                            </div>
                                        </th>
                                    ))}
                                    <th
                                        className="p-4 text-left text-sm font-medium text-gray-700 whitespace-nowrap"
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
                                        className={`hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                            selectedRows.includes(item.id) ? "bg-blue-100" : ""
                                        }`} // Apply bg-blue-100 for active row
                                    >
                                        <td
                                            className="p-2 text-sm text-gray-600"
                                            style={{ width: columnWidths[0] }}
                                        >
                                            {/* Individual checkbox for each row */}
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.includes(item.id)}
                                                onChange={() => handleSelectRow(item.id)} // Handle individual row selection
                                                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                        </td>
                                        {columnHeaders.map((_, colIndex) => (
                                            <td
                                                key={colIndex}
                                                className="p-2 text-sm text-gray-600"
                                                style={{ width: columnWidths[colIndex + 1] }}
                                            >
                                                {Object.values(item)[colIndex]}
                                            </td>
                                        ))}
                                        <td
                                            className="p-2 text-sm text-gray-600"
                                            style={{ width: columnWidths[columnHeaders.length + 1] }}
                                        >
                                            <div className="flex justify-end">
                                                <button
                                                    className="p-2 text-blue-500 hover:text-blue-700"
                                                    aria-label="Edit"
                                                >
                                                    <Edit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => onDelete(index)}
                                                    className="p-2 text-red-500 hover:text-red-700"
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
