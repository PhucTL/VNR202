import React from 'react';
import { ProgressProvider } from './context/ProgressContext';
import Home from './pages/Home';

export default function App() {
  return (
    <ProgressProvider>
      <div className="museum-root">
        <Home />
      </div>
    </ProgressProvider>
  );
}
