import { DayContent } from './types';
import { day1Content } from './day1';
import { day2Content } from './day2';

// This will be populated as we add more days
const daysContent: Record<number, DayContent> = {
  1: day1Content,
  2: day2Content,
  // Add more days as they are implemented
};

export const getDayContent = (day: number): DayContent => {
  if (day < 1 || day > 30) {
    throw new Error('Invalid day number');
  }

  return daysContent[day] || {
    readingMaterial: "This day's content is coming soon...",
    challenge: "This day's challenge is coming soon...",
    isImplemented: false,
  };
}; 