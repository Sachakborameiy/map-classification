import React from "react";
import { Undo2, Send, ArrowLeft } from "lucide-react";

interface ButtonProps {
    type?: "reset" | "submit" | "button";
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    icon?: React.ReactNode;
    backgroundColor?: string;
    hoverColor?: string;
    title?: string;
}

const Button: React.FC<ButtonProps> = ({
    type = "button",
    onClick,
    className = "",
    children,
    icon,
    backgroundColor = "",
    hoverColor = "",
    title,
}) => (
    <button
        type={type}
        onClick={onClick}
        title={title}
        className={`flex items-center justify-center py-2 px-2 rounded-md shadow-md text-white text-sm transition-all duration-200 ${backgroundColor} ${className} hover:${hoverColor}`}
    >
        {icon && <span className="mr-2">{icon}</span>}
        {children}
    </button>
);

interface ButtonGroupProps {
    handleBack: () => void;
    handleUndo: () => void;
    handleSubmit: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ handleBack, handleUndo, handleSubmit }) => (
    <div className="flex items-center justify-between space-x-2 my-1 m-5">
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

        {/* Undo Button */}
        <div className="flex justify-end space-x-4">

            {/* Submit Button */}
            <Button
                onClick={handleSubmit}
                type="submit"
                backgroundColor="bg-[#1B3351]"
                hoverColor="bg-[#152942]"
            >
                <div className="flex gap-1">
                    <Send className="w-5 h-5" />
                    <span>បញ្ចូនទិន្នន័យ</span>
                </div>
            </Button>
        </div>
    </div>
);

export default ButtonGroup;
