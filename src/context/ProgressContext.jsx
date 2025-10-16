import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'museum_progress_v1';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [unlockedPieces, setUnlockedPieces] = useState(Array(6).fill(false));
  const [completedPhases, setCompletedPhases] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUnlockedPieces(parsed.unlockedPieces || Array(6).fill(false));
        setCompletedPhases(parsed.completedPhases || []);
      } catch {}
    }
  }, []);

  useEffect(() => {
    const payload = { unlockedPieces, completedPhases };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [unlockedPieces, completedPhases]);

  const unlockPiece = (idx) => {
    setUnlockedPieces((s) => {
      const copy = [...s];
      copy[idx] = true;
      return copy;
    });
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
