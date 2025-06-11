import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getDayContent } from '../../data/days';

interface ReadingMaterialProps {
  day: number;
  onComplete: () => void;
  onBack: () => void;
}

const ReadingMaterial: React.FC<ReadingMaterialProps> = ({
  day,
  onComplete,
  onBack,
}) => {
  const content = getDayContent(day);
  const isImplemented = content.isImplemented;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Dashboard
        </button>
        <h1 className="text-3xl font-bold">Day {day}</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{content.readingMaterial}</ReactMarkdown>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onComplete}
          disabled={!isImplemented}
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition-colors ${
            isImplemented
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isImplemented ? "I'm Ready for the Challenge" : "Challenge Coming Soon"}
        </button>
      </div>
    </div>
  );
};

export default ReadingMaterial; 