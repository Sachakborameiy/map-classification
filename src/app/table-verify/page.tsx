import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

interface ShowModalProps {
  showModal: boolean;
  message: string | null;
  closeModal: () => void;
  sampleData: any[];
  columnHeaders: string[];
}

const ShowModal: React.FC<ShowModalProps> = ({ showModal, closeModal, sampleData, columnHeaders }) => {
  const { isOpen, onOpenChange } = useDisclosure({
    isOpen: showModal,
    onClose: closeModal, // Close modal when clicking outside
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="z-50"
      placement="center"
      closeButton={false} 
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40" onClick={closeModal}></div>

      <ModalContent className="relative w-[95%] max-h-[140vh] rounded-lg shadow-xl bg-white">
        {(onClose) => (
          <>
            {/* Modal Header */}
            <ModalHeader className="text-center text-2xl font-bold text-gray-800 m-auto">
              ពិនិត្យទិន្នន័យមុនដាក់បញ្ចូន
            </ModalHeader>

            {/* Modal Body */}
            <ModalBody className="p-6">
              <div className="overflow-x-auto max-h-[50vh]">
                <table className="min-w-full border-separate border border-gray-300 rounded-lg shadow-md">
                  {/* Table Header */}
                  <thead className="px-2 py-1 border-b border-gray-300 text-left text-xs font-semibold text-gray-700 whitespace-nowrap">
                    <tr>
                      {columnHeaders.map((header, index) => (
                        <th
                          key={index}
                          className="px-4 py-2 border-b border-gray-300 text-left text-sm font-semibold text-gray-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody>
                    {sampleData.length > 0 ? (
                      sampleData.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                          {columnHeaders.map((header, colIndex) => (
                            <td
                              key={colIndex}
                              className="px-4 py-2 border-b border-gray-200 text-sm text-gray-600"
                            >
                              {row[header.replace(/ /g, "_")] || "N/A"}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={columnHeaders.length}
                          className="px-6 py-4 text-center text-gray-500"
                        >
                          No data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </ModalBody>

            {/* Modal Footer */}
            <ModalFooter className="justify-center gap-1 mt-4 mb-2">
              <Button
                color="danger"
                onPress={onClose}
                className="bg-gray-600 rounded-md text-white px-6 py-3 m-2 shadow-md hover:bg-gray-700 focus:outline-none text-sm transition-all duration-200"
              >
                ត្រឡប់ក្រោយ
              </Button>
              <Button
                color="primary"
                onPress={onClose}
                type="submit"
                className="bg-[#1B3351] rounded-md text-white px-6 py-3 m-2 shadow-md hover:bg-[#152942] focus:outline-none text-sm transition-all duration-200"
              >
                បញ្ចូនទិន្នន័យ
              </Button>
            </ModalFooter>

          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ShowModal;
