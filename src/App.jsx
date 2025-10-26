import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { ProgressProvider } from './context/ProgressContext';
import router from './router';

export default function App() {
  return (
    <ProgressProvider>
      <div className="museum-root">
        <RouterProvider router={router} />
      </div>
    </ProgressProvider>
  );
}
