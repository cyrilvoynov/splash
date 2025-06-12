import { useState, useCallback, useEffect } from 'react';
import { Animated, Platform } from 'react-native';
import { DynamicIsland } from '../native/DynamicIslandModule';

export interface PoopSession {
  startTime: Date;
  duration: number;
}

export const usePoopSession = () => {
  const [session, setSession] = useState<PoopSession | null>(null);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const timerOpacity = new Animated.Value(0);

  const updateDynamicIsland = useCallback(async (duration: number) => {
    if (Platform.OS === 'ios') {
      await DynamicIsland.updateTimer(duration);
    }
  }, []);

  const startSession = useCallback(async () => {
    const newSession: PoopSession = {
      startTime: new Date(),
      duration: 0,
    };
    setSession(newSession);

    // Show timer with animation
    Animated.timing(timerOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Start timer
    const interval = setInterval(async () => {
      const duration = Math.floor(
        (Date.now() - newSession.startTime.getTime()) / 1000
      );
      setSession((prev) =>
        prev ? { ...prev, duration } : null
      );
      await updateDynamicIsland(duration);
    }, 1000);
    setTimer(interval);

    // Show in Dynamic Island
    if (Platform.OS === 'ios') {
      await DynamicIsland.showTimer(0);
    }
  }, []);

  const endSession = useCallback(async () => {
    if (!session) return null;

    // Clear timer
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    // Hide timer with animation
    Animated.timing(timerOpacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Hide from Dynamic Island
    if (Platform.OS === 'ios') {
      await DynamicIsland.hideTimer();
    }

    const finalSession = { ...session };
    setSession(null);
    return finalSession;
  }, [session, timer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [timer]);

  return {
    session,
    startSession,
    endSession,
    timerOpacity,
  };
}; 