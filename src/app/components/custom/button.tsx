import ShowModal from "@/app/verify-data/page";
import React from "react";
import { ArrowLeft, EyeIcon, Plus, Trash2 } from "lucide-react";

interface ButtonProps {
  type: "reset" | "submit" | "button";
  label?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  backgroundColor: string;
  hoverColor: string;
  title?: string;
  widthClass?: string;
}

interface ButtonGroupProps {
  handleBack: () => void;
  handlePreviewClick: () => void;
  handleClear: () => void;
  showModal: boolean;
  message: string;
  closeModal: () => void;
  sampleData: any;
  transformedColumnHeaders: any;
}

const Button: React.FC<ButtonProps> = ({
  type,
  label,
  onClick,
  icon,
  backgroundColor,
  hoverColor,
  title,
  widthClass = "w-auto",
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`flex items-center justify-center py-2 px-2 rounded-md shadow-lg ${backgroundColor} outline-none text-white hover:${hoverColor} hover:shadow-xl transition-all text-base font-semibold ${widthClass}`}
    title={title}
  >
    <span className="mr-1">{icon}</span> {/* Spacing between icon and label */}
    {label && <span className="text-sm">{label}</span>}
  </button>
);

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  handleBack,
  handlePreviewClick,
  handleClear,
  showModal,
  message,
  closeModal,
  sampleData,
  transformedColumnHeaders,
}) => (
  <div className="flex items-center justify-between space-x-2"> {/* Improved spacing */}
    <div>
      <Button
        type="reset"
        onClick={handleBack}
        icon={<ArrowLeft className="h-5 w-5" />}
        backgroundColor="bg-[#0f81c3]"
        hoverColor="bg-[#2c6294]"
        title="Back to land classification screen"
        widthClass="w-3/1" // Slightly larger width
      />
    </div>

    <div className="flex justify-end space-x-4"> {/* Improved spacing */}
      <Button
        type="submit"
        onClick={() => {}}
        icon={<Plus className="w-4 h-4" />} 
        backgroundColor="bg-[#5fb637]"
        hoverColor="bg-[#0DAF5E]"
        label="បន្ថែម"
        widthClass="w-3/1"
      />

      <Button
        type="submit"
        onClick={handlePreviewClick}
        icon={<EyeIcon className="w-4 h-4" />} 
        backgroundColor="bg-[#1B3351]"
        hoverColor="bg-[#1e3e66]"
        label="ពិនិត្យបញ្ជាក់"
        widthClass="w-3/1"
      />

      <Button
        type="button"
        onClick={handleClear}
        icon={<Trash2 className="w-4 h-4" />} 
        backgroundColor="bg-[#FF5733]"
        hoverColor="bg-[#E04E2E]"
        title="Clear data in input fields"
        label="លុប"
        widthClass="w-3/1"
      />
    </div>

    {/* Modal (assuming you have a modal component) */}
    <ShowModal
      showModal={showModal}
      message={message}
      closeModal={closeModal}
      sampleData={sampleData}
      columnHeaders={transformedColumnHeaders}
    />
  </div>
);

export default ButtonGroup;
