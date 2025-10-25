
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <div className="w-16 h-16 border-4 border-white border-t-transparent border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-semibold tracking-wider">Enhancing Film Data...</p>
    </div>
  );
};

export default LoadingSpinner;
