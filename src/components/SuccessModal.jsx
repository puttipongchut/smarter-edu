import React from "react";

const SuccessModal = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900">&times;</button>
        </div>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
};

export default SuccessModal;
