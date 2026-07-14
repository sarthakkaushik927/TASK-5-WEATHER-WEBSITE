import React from 'react';
import { CheckCircle } from 'lucide-react';

const SuccessAlert = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center space-x-2 text-green-400 bg-green-500/10 p-3 rounded-lg">
      <CheckCircle size={20} className="shrink-0" />
      <span>{message}</span>
    </div>
  );
};

export default SuccessAlert;
