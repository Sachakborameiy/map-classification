import React from "react";

interface ShowModalProps {
  showModal: boolean;
  message: string | null;
  closeModal: () => void;
  sampleData: any[];
  columnHeaders: string[];
}

const ShowModal: React.FC<ShowModalProps> = ({ showModal, message, closeModal, sampleData, columnHeaders }) => {
  if (!showModal) return null; // If showModal is false, don't render the modal

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40">
      <div className="w-11/12 h-[95vh] bg-white rounded-lg p-6 shadow-lg overflow-auto">
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-800 text-center mb-6">ពិនិត្យទិន្នន័យមុនដាក់បញ្ចូន</h3>
        
        {/* Table Section with scroll */}
        <div className="overflow-x-auto overflow-y-auto h-[calc(95vh-180px)] mt-4">
          <table className="min-w-full border-separate border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                {/* Sticky column headers */}
                {columnHeaders.map((header, index) => (
                  <th
                    key={index}
                    className="px-4 py-3 border-b border-gray-300 text-left text-sm font-semibold text-gray-700 whitespace-nowrap sticky top-0 bg-gray-200 z-10"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Display the data for each entry */}
              {sampleData.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columnHeaders.map((header, colIndex) => (
                    <td key={colIndex} className="px-4 py-3 border-b border-gray-200 text-sm text-gray-600">
                      {/* Display the corresponding data */}
                      <span>{row[header.replace(/ /g, '_')] || 'N/A'}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={closeModal}  // Close modal on Back button click
            className="px-4 py-3 text-white bg-gray-500 rounded-md shadow-lg hover:bg-gray-400 focus:outline-none transition duration-300"
          >
            ត្រឡប់ក្រោយ
          </button>
          <button
            onClick={closeModal}  // Submit action (close modal)
            className="px-4 py-3 text-white bg-[#428BCA] rounded-md shadow-lg hover:bg-[#3578b6] focus:outline-none transition duration-300"
          >
            បញ្ចូនទិន្នន័យ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowModal;
