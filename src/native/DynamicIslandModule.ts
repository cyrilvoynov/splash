import { NativeModules, Platform } from 'react-native';

interface DynamicIslandInterface {
  showTimer: (duration: number) => Promise<void>;
  updateTimer: (remainingTime: number) => Promise<void>;
  hideTimer: () => Promise<void>;
}

const { DynamicIslandModule } = NativeModules;

export const DynamicIsland: DynamicIslandInterface = {
  showTimer: async (duration: number) => {
    if (Platform.OS !== 'ios') return;
    try {
      await DynamicIslandModule.showTimer(duration);
    } catch (error) {
      console.error('Error showing Dynamic Island timer:', error);
    }
  },

  updateTimer: async (remainingTime: number) => {
    if (Platform.OS !== 'ios') return;
    try {
      await DynamicIslandModule.updateTimer(remainingTime);
    } catch (error) {
      console.error('Error updating Dynamic Island timer:', error);
    }
  },

  hideTimer: async () => {
    if (Platform.OS !== 'ios') return;
    try {
      await DynamicIslandModule.hideTimer();
    } catch (error) {
      console.error('Error hiding Dynamic Island timer:', error);
    }
  },
}; 