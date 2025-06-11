import React from 'react';

interface ProgressBarProps {
  completed: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ completed, total }) => {
  const percentage = (completed / total) * 100;

  return (
    <div className="relative w-full bg-gray-200 rounded-full h-6 mb-8">
      <div
        className="bg-blue-600 h-6 rounded-full transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-medium text-gray-700">
          {completed}/{total} Days Completed
        </span>
      </div>
    </div>
  );
};

export default ProgressBar; 