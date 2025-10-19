import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'museum_progress_v2';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [unlockedPieces, setUnlockedPieces] = useState([]); // Array of milestone IDs
  const [completedPhases, setCompletedPhases] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUnlockedPieces(parsed.unlockedPieces || []);
        setCompletedPhases(parsed.completedPhases || []);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = { unlockedPieces, completedPhases };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [unlockedPieces, completedPhases]);

  const unlockPiece = (milestoneId) => {
    setUnlockedPieces((s) => 
      s.includes(milestoneId) ? s : [...s, milestoneId]
    );
  };

  const markPhaseComplete = (phaseId) => {
    setCompletedPhases((s) => (s.includes(phaseId) ? s : [...s, phaseId]));
  };

  return (
    <ProgressContext.Provider value={{ unlockedPieces, unlockPiece, completedPhases, markPhaseComplete }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

export default ProgressContext;
