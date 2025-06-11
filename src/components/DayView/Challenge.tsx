import React from 'react';
import ReactMarkdown from 'react-markdown';
import { getDayContent } from '../../data/days';

interface ChallengeProps {
  day: number;
  onComplete: () => void;
  onBack: () => void;
}

const Challenge: React.FC<ChallengeProps> = ({
  day,
  onComplete,
  onBack,
}) => {
  const content = getDayContent(day);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Back to Reading
        </button>
        <h1 className="text-3xl font-bold">Day {day} Challenge</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{content.challenge}</ReactMarkdown>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={onComplete}
          className="bg-green-500 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors"
        >
          I Completed the Challenge
        </button>
      </div>
    </div>
  );
};

export default Challenge; 