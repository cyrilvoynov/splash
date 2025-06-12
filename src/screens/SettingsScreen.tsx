import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useReminderEngine, ReminderFrequency } from '../hooks/useReminderEngine';
import { useSound } from '../hooks/useSound';
import { useHaptic } from '../hooks/useHaptic';

interface FrequencyOption {
  value: ReminderFrequency;
  label: string;
  description: string;
}

const FREQUENCY_OPTIONS: FrequencyOption[] = [
  {
    value: 'low',
    label: 'Low',
    description: '20% longer than your average interval',
  },
  {
    value: 'medium',
    label: 'Medium',
    description: 'Based on your exact average interval',
  },
  {
    value: 'high',
    label: 'High',
    description: '20% shorter than your average interval',
  },
];

export const SettingsScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [frequency, setFrequency] = useState<ReminderFrequency>('medium');
  const { loadSettings, updateSettings } = useReminderEngine();
  const sound = useSound('tap');
  const haptic = useHaptic();

  useEffect(() => {
    const init = async () => {
      const settings = await loadSettings();
      setEnabled(settings.enabled);
      setFrequency(settings.frequency);
      setIsLoading(false);
    };
    init();
  }, []);

  const handleToggleEnabled = async () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    await Promise.all([sound.play(), haptic.trigger('light')]);
    await updateSettings({ enabled: newEnabled, frequency });
  };

  const handleFrequencyChange = async (newFrequency: ReminderFrequency) => {
    setFrequency(newFrequency);
    await Promise.all([sound.play(), haptic.trigger('light')]);
    await updateSettings({ enabled, frequency: newFrequency });
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reminders</Text>
        <View style={styles.option}>
          <View>
            <Text style={styles.optionLabel}>Enable Reminders</Text>
            <Text style={styles.optionDescription}>
              Get notified when it might be time for a splash
            </Text>
          </View>
          <Switch
            value={enabled}
            onValueChange={handleToggleEnabled}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={enabled ? '#2196F3' : '#f4f3f4'}
          />
        </View>

        {enabled && (
          <View style={styles.frequencyOptions}>
            <Text style={styles.frequencyTitle}>Reminder Frequency</Text>
            {FREQUENCY_OPTIONS.map((option) => (
              <Pressable
                key={option.value}
                style={[
                  styles.frequencyOption,
                  frequency === option.value && styles.frequencyOptionSelected,
                ]}
                onPress={() => handleFrequencyChange(option.value)}
              >
                <View>
                  <Text
                    style={[
                      styles.frequencyLabel,
                      frequency === option.value &&
                        styles.frequencyLabelSelected,
                    ]}
                  >
                    {option.label}
                  </Text>
                  <Text style={styles.frequencyDescription}>
                    {option.description}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.disclaimer}>
          Reminders are based on your historical patterns and will automatically
          adjust as your patterns change.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#000',
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  optionLabel: {
    fontSize: 17,
    color: '#000',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    maxWidth: '80%',
  },
  frequencyOptions: {
    marginTop: 20,
  },
  frequencyTitle: {
    fontSize: 17,
    color: '#000',
    marginBottom: 10,
  },
  frequencyOption: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: '#F5F5F5',
  },
  frequencyOptionSelected: {
    backgroundColor: '#E3F2FD',
  },
  frequencyLabel: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  frequencyLabelSelected: {
    fontWeight: '600',
    color: '#2196F3',
  },
  frequencyDescription: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    padding: 20,
    marginTop: 'auto',
  },
  disclaimer: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 