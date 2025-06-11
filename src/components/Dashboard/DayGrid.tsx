import React from 'react';
import DayCard from './DayCard';

interface DayGridProps {
  onDayClick: (dayNumber: number) => void;
  isDayAvailable: (dayNumber: number) => boolean;
  completedDays: number[];
}

const DayGrid: React.FC<DayGridProps> = ({
  onDayClick,
  isDayAvailable,
  completedDays,
}) => {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {days.map((day) => (
        <DayCard
          key={day}
          dayNumber={day}
          isAvailable={isDayAvailable(day)}
          isCompleted={completedDays.includes(day)}
          onClick={() => onDayClick(day)}
        />
      ))}
    </div>
  );
};

export default DayGrid; 