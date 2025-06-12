import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useState, useEffect } from 'react';

export interface PoopEntry {
  id: string;
  timestamp: string;
  duration: number;
  type: number;
  size: number;
  color: string;
  notes?: string;
}

const STORAGE_KEY = '@splash/entries';

export const usePoopStorage = () => {
  const [entries, setEntries] = useState<PoopEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        setEntries(JSON.parse(data));
      }
    } catch (error) {
      console.error('Error loading entries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEntry = useCallback(async (entry: Omit<PoopEntry, 'id'>) => {
    try {
      const newEntry: PoopEntry = {
        ...entry,
        id: Date.now().toString(),
      };

      const updatedEntries = [newEntry, ...entries];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
      return newEntry;
    } catch (error) {
      console.error('Error adding entry:', error);
      throw error;
    }
  }, [entries]);

  const removeEntry = useCallback(async (id: string) => {
    try {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEntries));
      setEntries(updatedEntries);
    } catch (error) {
      console.error('Error removing entry:', error);
      throw error;
    }
  }, [entries]);

  const clearEntries = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setEntries([]);
    } catch (error) {
      console.error('Error clearing entries:', error);
      throw error;
    }
  }, []);

  return {
    entries,
    isLoading,
    addEntry,
    removeEntry,
    clearEntries,
  };
}; 