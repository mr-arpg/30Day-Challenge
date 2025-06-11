import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import DayView from './components/DayView';
import { useScrollToTop } from './hooks/useScrollToTop';

// Create a wrapper component that uses the hook
const AppContent: React.FC = () => {
  useScrollToTop();
  
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/day/:dayNumber" element={<DayView />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AppContent />
    </Router>
  );
};

export default App; 