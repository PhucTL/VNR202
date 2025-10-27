import React, { createContext, useContext, useEffect, useState } from 'react';
import TIMELINE from '../data/timeline';

const STORAGE_KEY = 'museum_progress_v2';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [unlockedPieces, setUnlockedPieces] = useState([]); // Array of milestone IDs
  const [completedPhases, setCompletedPhases] = useState([]);
  const [completionTimestamp, setCompletionTimestamp] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [startTimestamp, setStartTimestamp] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        setUnlockedPieces(parsed.unlockedPieces || []);
        setCompletedPhases(parsed.completedPhases || []);
        setCompletionTimestamp(parsed.completionTimestamp || null);
      } catch {}
    }
    
    // Load player info from separate localStorage items
    const name = localStorage.getItem('playerName');
    const start = localStorage.getItem('startTimestamp');
    
    console.log('📊 Loading from localStorage:', { name, start });
    
    if (name) setPlayerName(name);
    if (start) setStartTimestamp(parseInt(start));
  }, []);

  // Listen for localStorage changes (when user updates name)
  useEffect(() => {
    const handleStorageChange = () => {
      const name = localStorage.getItem('playerName');
      const start = localStorage.getItem('startTimestamp');
      
      console.log('🔄 Storage changed - updating playerName:', name);
      
      if (name) setPlayerName(name);
      if (start) setStartTimestamp(parseInt(start));
    };

    // Listen for storage events (from other tabs/windows)
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for focus events (when user comes back to tab)
    window.addEventListener('focus', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const payload = { unlockedPieces, completedPhases, completionTimestamp };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [unlockedPieces, completedPhases, completionTimestamp]);

  const unlockPiece = (milestoneId) => {
    console.log('🔓 unlockPiece called with:', milestoneId);
    console.log('Current unlockedPieces before update:', unlockedPieces);
    setUnlockedPieces((s) => {
      const newState = s.includes(milestoneId) ? s : [...s, milestoneId];
      console.log('🔄 New unlockedPieces state:', newState);
      return newState;
    });
  };

  const markPhaseComplete = (phaseId) => {
    setCompletedPhases((s) => (s.includes(phaseId) ? s : [...s, phaseId]));
  };

  // Function to manually refresh player data
  const refreshPlayerData = () => {
    const name = localStorage.getItem('playerName');
    const start = localStorage.getItem('startTimestamp');
    
    console.log('🔄 Manual refresh - playerName:', name);
    
    if (name) setPlayerName(name);
    if (start) setStartTimestamp(parseInt(start));
  };

  // Detect completion and set timestamp
  useEffect(() => {
    const isCompleted = completedPhases.length === TIMELINE.length;
    console.log('🔍 Completion check:', { 
      completedPhases: completedPhases.length, 
      totalPhases: TIMELINE.length, 
      isCompleted,
      completionTimestamp,
      startTimestamp 
    });
    
    if (isCompleted && !completionTimestamp && startTimestamp) {
      const timestamp = Date.now();
      setCompletionTimestamp(timestamp);
      console.log('🏆 Collection completed at', new Date(timestamp).toISOString());
    }
  }, [completedPhases, completionTimestamp, startTimestamp]);

  const value = {
    unlockedPieces,
    unlockPiece,
    completedPhases,
    markPhaseComplete,
    completionTimestamp,
    playerName,
    startTimestamp,
    refreshPlayerData,
    isCompleted: completedPhases.length === TIMELINE.length
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}

export default ProgressContext;
