import React, { useEffect, useState } from 'react';

function LoginSuccessModal({ onClose }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Simulate loading for 1 seconds

    const redirectTimer = setTimeout(() => {
      onClose(); // Trigger redirect after 2 seconds
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
        {isLoading ? (
          <div className="flex flex-col items-center">
            <div className="loader animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
            <p className="text-lg font-semibold">Logging you in...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-green-500 mb-4 transition delay-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414-1.414L9 9.586 7.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-lg font-semibold text-green-600">Login Successful!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSuccessModal;
