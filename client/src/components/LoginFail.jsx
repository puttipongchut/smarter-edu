import React, { useEffect } from 'react';

function LoginFailedModal({ onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); // Close the modal automatically after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <p className="text-lg font-semibold text-red-600">Login Failed!</p>
        <p className="text-sm text-gray-600 mt-2">Please check your email or password and try again.</p>
      </div>
    </div>
  );
}

export default LoginFailedModal;
