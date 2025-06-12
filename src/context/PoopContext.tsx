import { createContext, useContext, ReactNode } from 'react';
import { usePoopSession, PoopSession } from '../hooks/usePoopSession';
import { usePoopStorage, PoopEntry } from '../hooks/usePoopStorage';
import { Animated } from 'react-native';

interface PoopContextType {
  session: PoopSession | null;
  startSession: () => Promise<void>;
  endSession: () => Promise<PoopSession | null>;
  timerOpacity: Animated.Value;
  entries: PoopEntry[];
  isLoading: boolean;
  addEntry: (entry: Omit<PoopEntry, 'id'>) => Promise<PoopEntry>;
  removeEntry: (id: string) => Promise<void>;
  clearEntries: () => Promise<void>;
}

const PoopContext = createContext<PoopContextType | null>(null);

export const usePoopContext = () => {
  const context = useContext(PoopContext);
  if (!context) {
    throw new Error('usePoopContext must be used within a PoopContextProvider');
  }
  return context;
};

export const PoopContextProvider = ({ children }: { children: ReactNode }) => {
  const { session, startSession, endSession, timerOpacity } = usePoopSession();
  const { entries, isLoading, addEntry, removeEntry, clearEntries } = usePoopStorage();

  return (
    <PoopContext.Provider
      value={{
        session,
        startSession,
        endSession,
        timerOpacity,
        entries,
        isLoading,
        addEntry,
        removeEntry,
        clearEntries,
      }}
    >
      {children}
    </PoopContext.Provider>
  );
}; 