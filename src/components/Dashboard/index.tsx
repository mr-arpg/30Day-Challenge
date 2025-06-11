import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import DayGrid from './DayGrid';
import ProgressBar from './ProgressBar';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { progress, isDayAvailable, resetProgress } = useProgress();

  const handleDayClick = (dayNumber: number) => {
    if (isDayAvailable(dayNumber)) {
      navigate(`/day/${dayNumber}`);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your progress? This cannot be undone.')) {
      resetProgress();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          30-Day Social Skills Challenge
        </h1>
        {progress.completedDays.length > 0 && (
          <button
            onClick={handleReset}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            Reset Progress
          </button>
        )}
      </div>
      <ProgressBar 
        completed={progress.completedDays.length}
        total={30}
      />
      <DayGrid 
        onDayClick={handleDayClick}
        isDayAvailable={isDayAvailable}
        completedDays={progress.completedDays}
      />
    </div>
  );
};

export default Dashboard; 