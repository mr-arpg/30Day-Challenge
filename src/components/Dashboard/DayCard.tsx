import React from 'react';

interface DayCardProps {
  dayNumber: number;
  isAvailable: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

const DayCard: React.FC<DayCardProps> = ({
  dayNumber,
  isAvailable,
  isCompleted,
  onClick,
}) => {
  const getCardStyle = () => {
    if (isCompleted) {
      return 'bg-green-500 hover:bg-green-600';
    }
    if (isAvailable) {
      return 'bg-blue-500 hover:bg-blue-600';
    }
    return 'bg-gray-300 cursor-not-allowed';
  };

  return (
    <div
      className={`p-4 rounded-lg shadow-md text-white text-center cursor-pointer transition-colors ${getCardStyle()}`}
      onClick={isAvailable ? onClick : undefined}
    >
      <div className="text-2xl font-bold">Day {dayNumber}</div>
      <div className="text-sm mt-2">
        {isCompleted
          ? 'Completed'
          : isAvailable
          ? 'Available'
          : 'Coming Soon'}
      </div>
    </div>
  );
};

export default DayCard; 