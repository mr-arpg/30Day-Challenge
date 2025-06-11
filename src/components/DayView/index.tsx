import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import ReadingMaterial from './ReadingMaterial';
import Challenge from './Challenge';

const DayView: React.FC = () => {
  const { dayNumber } = useParams<{ dayNumber: string }>();
  const navigate = useNavigate();
  const { isDayAvailable, completeDay} = useProgress();
  const [showChallenge, setShowChallenge] = useState(false);
  const challengeRef = useRef<HTMLDivElement>(null);

  const day = parseInt(dayNumber || '1', 10);

  // Scroll to top when transitioning to challenge
  useEffect(() => {
    if (showChallenge && challengeRef.current) {
      // Use requestAnimationFrame to ensure the DOM has updated
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto' // Changed to 'auto' as it's a valid ScrollBehavior type
        });
      });
    }
  }, [showChallenge]);

  if (!isDayAvailable(day)) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Day {day} is not available yet</h1>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleReadingComplete = () => {
    setShowChallenge(true);
  };

  const handleChallengeComplete = async () => {
    console.log('Starting challenge completion for day', day);
    completeDay(day);
    // Wait a moment for state to update
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('Navigating to dashboard');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {!showChallenge ? (
        <ReadingMaterial
          day={day}
          onComplete={handleReadingComplete}
          onBack={() => navigate('/')}
        />
      ) : (
        <div ref={challengeRef}>
          <Challenge
            day={day}
            onComplete={handleChallengeComplete}
            onBack={() => setShowChallenge(false)}
          />
        </div>
      )}
    </div>
  );
};

export default DayView; 