import React from 'react';

const sampleData = [
    // Your sample data here...
];

const columnHeaders = [
    // Your column headers here...
];

interface ModalProps {
    showModal: boolean;
    closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ showModal, closeModal }) => {
    if (!showModal) return null; // Don't render the modal if showModal is false.

    return (
        <div className="modal" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Sample Data Table</h2>
                <table className="table">
                    <thead>
                        <tr>
                            {columnHeaders.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {sampleData.map((row, index) => (
                            <tr key={index}>
                                {Object.values(row).map((value, i) => (
                                    <td key={i}>{value}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={closeModal} className="btn btn-secondary">
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
