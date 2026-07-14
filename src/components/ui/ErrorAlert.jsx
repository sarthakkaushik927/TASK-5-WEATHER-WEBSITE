import React from 'react';
import { AlertCircle } from 'lucide-react';

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 p-3 rounded-lg">
      <AlertCircle size={20} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default ErrorAlert;
