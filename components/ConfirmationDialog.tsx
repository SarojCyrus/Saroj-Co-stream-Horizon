import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in-fast"
      aria-modal="true"
      role="dialog"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4 border border-gray-700"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dialog
      >
        <h2 className="text-xl font-bold text-teal-400 mb-4">{title}</h2>
        <div className="text-gray-300 text-sm space-y-3 mb-6">
          {children}
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-lg transition-colors"
          >
            Confirm & Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
