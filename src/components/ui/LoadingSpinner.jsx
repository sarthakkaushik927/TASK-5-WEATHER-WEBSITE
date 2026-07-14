import React from 'react';
import { LoaderCircle } from 'lucide-react';

const LoadingSpinner = ({ message = 'Loading...', size = 'lg' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
  };

  return (
    <div className="flex flex-col items-center justify-center h-full w-full py-20">
      <LoaderCircle className={`${sizeClasses[size]} animate-spin text-purple-500`} />
      {message && <p className="mt-4 text-xl text-gray-300">{message}</p>}
    </div>
  );
};

export default LoadingSpinner;
