import { useEffect, useCallback } from 'react';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { usePoopAnalytics } from './usePoopAnalytics';
import { usePoopContext } from '../context/PoopContext';

const REMINDER_SETTINGS_KEY = '@splash/reminder_settings';
const BACKGROUND_TASK_NAME = 'SPLASH_REMINDER_TASK';

export type ReminderFrequency = 'low' | 'medium' | 'high';

interface ReminderSettings {
  enabled: boolean;
  frequency: ReminderFrequency;
}

const FREQUENCY_MULTIPLIERS = {
  low: 1.2, // 20% longer than average
  medium: 1, // exactly average
  high: 0.8, // 20% shorter than average
};

export const useReminderEngine = () => {
  const { entries } = usePoopContext();
  const analytics = usePoopAnalytics(entries);

  // Load settings from storage
  const loadSettings = useCallback(async () => {
    try {
      const settings = await AsyncStorage.getItem(REMINDER_SETTINGS_KEY);
      return settings
        ? (JSON.parse(settings) as ReminderSettings)
        : { enabled: false, frequency: 'medium' as ReminderFrequency };
    } catch (error) {
      console.error('Error loading reminder settings:', error);
      return { enabled: false, frequency: 'medium' as ReminderFrequency };
    }
  }, []);

  // Save settings to storage
  const saveSettings = useCallback(async (settings: ReminderSettings) => {
    try {
      await AsyncStorage.setItem(REMINDER_SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving reminder settings:', error);
    }
  }, []);

  // Request notification permissions
  const requestPermissions = useCallback(async () => {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }, []);

  // Schedule next reminder
  const scheduleReminder = useCallback(
    async (settings: ReminderSettings) => {
      if (!settings.enabled) return;

      try {
        // Cancel any existing notifications
        await Notifications.cancelAllScheduledNotificationsAsync();

        // Calculate next reminder time based on analytics
        const avgInterval = analytics.averageInterval; // in hours
        if (!avgInterval) return; // No data to base reminder on

        const multiplier = FREQUENCY_MULTIPLIERS[settings.frequency];
        const nextReminderHours = avgInterval * multiplier;

        // Add some random variance (±30 minutes)
        const variance = Math.random() * 60 - 30;
        const nextReminderMinutes = nextReminderHours * 60 + variance;

        // Schedule the notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Time for a Splash! 💦',
            body: 'Based on your patterns, now might be a good time.',
            sound: true,
          },
          trigger: {
            seconds: nextReminderMinutes * 60,
            repeats: false,
          },
        });

        console.log(`Scheduled reminder for ${nextReminderMinutes} minutes`);
      } catch (error) {
        console.error('Error scheduling reminder:', error);
      }
    },
    [analytics.averageInterval]
  );

  // Initialize notifications
  useEffect(() => {
    const init = async () => {
      // Configure notification behavior
      await Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: false,
        }),
      });

      // Load settings and schedule if enabled
      const settings = await loadSettings();
      if (settings.enabled) {
        const hasPermission = await requestPermissions();
        if (hasPermission) {
          await scheduleReminder(settings);
        }
      }
    };

    init();
  }, []);

  // Update reminder when analytics change
  useEffect(() => {
    const updateReminder = async () => {
      const settings = await loadSettings();
      if (settings.enabled) {
        await scheduleReminder(settings);
      }
    };

    updateReminder();
  }, [analytics.averageInterval]);

  // Expose methods for settings screen
  const updateSettings = useCallback(
    async (newSettings: ReminderSettings) => {
      await saveSettings(newSettings);
      if (newSettings.enabled) {
        const hasPermission = await requestPermissions();
        if (hasPermission) {
          await scheduleReminder(newSettings);
        }
      } else {
        await Notifications.cancelAllScheduledNotificationsAsync();
      }
    },
    [scheduleReminder]
  );

  return {
    loadSettings,
    updateSettings,
  };
}; 