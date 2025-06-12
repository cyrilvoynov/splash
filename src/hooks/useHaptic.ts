import * as Haptics from 'expo-haptics';
import { useCallback } from 'react';

type HapticType = 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning';

export const useHaptic = () => {
  const trigger = useCallback(async (type: HapticType = 'light') => {
    try {
      switch (type) {
        case 'light':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          break;
        case 'medium':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          break;
        case 'heavy':
          await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          break;
        case 'success':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          break;
        case 'error':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
          break;
        case 'warning':
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          break;
      }
    } catch (error) {
      console.warn('Error triggering haptic:', error);
    }
  }, []);

  return { trigger };
}; 