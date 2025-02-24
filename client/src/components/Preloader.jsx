import React from 'react';
import './Preloader.css';

function PreLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-25 z-50">
      <div className="loader animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
    </div>
  );
}

export default PreLoader;
