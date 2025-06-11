import { useState, useEffect } from 'react';

interface Progress {
  completedDays: number[];
  lastCompletionTime: number | null;
}

const STORAGE_KEY = 'social-challenge-progress';
// Feature flag to control 24-hour restriction
const ENABLE_24H_RESTRICTION = false;

const getStoredProgress = (): Progress => {
  const stored = localStorage.getItem(STORAGE_KEY);
  console.log('Getting stored progress:', stored);
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    completedDays: [],
    lastCompletionTime: null,
  };
};

export const useProgress = () => {
  const [progress, setProgress] = useState<Progress>(getStoredProgress);

  useEffect(() => {
    console.log('Progress updated:', progress);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const isDayAvailable = (dayNumber: number): boolean => {
    console.log('Checking if day', dayNumber, 'is available');
    console.log('Current progress:', progress);
    
    // Day 1 is always available
    if (dayNumber === 1) return true;

    // Check if previous day is completed
    const previousDay = dayNumber - 1;
    if (!progress.completedDays.includes(previousDay)) {
      console.log('Previous day', previousDay, 'not completed');
      return false;
    }

    // Skip 24-hour check if feature flag is disabled
    if (!ENABLE_24H_RESTRICTION) {
      console.log('24h restriction disabled, day is available');
      return true;
    }

    // Check if 24 hours have passed since last completion
    if (!progress.lastCompletionTime) {
      console.log('No last completion time');
      return false;
    }
    
    const now = Date.now();
    const timeSinceLastCompletion = now - progress.lastCompletionTime;
    const hoursSinceLastCompletion = timeSinceLastCompletion / (1000 * 60 * 60);
    
    console.log('Hours since last completion:', hoursSinceLastCompletion);
    return hoursSinceLastCompletion >= 24;
  };

  const completeDay = (dayNumber: number) => {
    console.log('Completing day', dayNumber);
    console.log('Current progress before update:', progress);
    
    if (!progress.completedDays.includes(dayNumber)) {
      const newProgress = {
        completedDays: [...progress.completedDays, dayNumber],
        lastCompletionTime: Date.now(),
      };
      console.log('Setting new progress:', newProgress);
      setProgress(newProgress);
    } else {
      console.log('Day already completed');
    }
  };

  const resetProgress = () => {
    console.log('Resetting progress');
    const newProgress = {
      completedDays: [],
      lastCompletionTime: null,
    };
    setProgress(newProgress);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    progress,
    isDayAvailable,
    completeDay,
    resetProgress,
  };
}; 