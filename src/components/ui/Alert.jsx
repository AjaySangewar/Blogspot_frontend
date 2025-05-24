import React from 'react';
import { AlertCircle, CheckCircle, XCircle, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap = {
  success: <CheckCircle className="h-5 w-5" />,
  error: <XCircle className="h-5 w-5" />,
  warning: <AlertCircle className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
};

const bgColorMap = {
  success: 'bg-green-50',
  error: 'bg-red-50',
  warning: 'bg-yellow-50',
  info: 'bg-blue-50',
};

const textColorMap = {
  success: 'text-green-800',
  error: 'text-red-800',
  warning: 'text-yellow-800',
  info: 'text-blue-800',
};

const borderColorMap = {
  success: 'border-green-400',
  error: 'border-red-400',
  warning: 'border-yellow-400',
  info: 'border-blue-400',
};

const iconColorMap = {
  success: 'text-green-500',
  error: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

const Alert = ({ type = 'info', message, onClose }) => {
  if (!message) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`p-4 mb-4 border-l-4 rounded-md ${bgColorMap[type]} ${borderColorMap[type]}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className={`mr-3 ${iconColorMap[type]}`}>
          {iconMap[type]}
        </div>
        <div className={`flex-1 ${textColorMap[type]}`}>
          <p>{message}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex ${textColorMap[type]} hover:bg-gray-200 focus:ring-2 focus:ring-gray-300`}
          >
            <span className="sr-only">Dismiss</span>
            <XCircle className="h-5 w-5" />
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default Alert;