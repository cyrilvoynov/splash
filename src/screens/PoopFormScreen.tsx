import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { ColorPicker } from '../components/form/ColorPicker';
import { ShapeSelector } from '../components/form/ShapeSelector';
import { SizeSlider } from '../components/form/SizeSlider';
import { Toast } from '../components/Toast';
import { usePoopContext } from '../context/PoopContext';
import { useSound } from '../hooks/useSound';
import { useHaptic } from '../hooks/useHaptic';

interface FormData {
  type: number;
  size: number;
  color: string;
  notes?: string;
}

export const PoopFormScreen = () => {
  const navigation = useNavigation();
  const { session, addEntry } = usePoopContext();
  const [formData, setFormData] = useState<FormData>({
    type: 4, // Type 4 is "normal"
    size: 2, // Medium
    color: '#8B4513', // Brown
  });
  const [showToast, setShowToast] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const sound = useSound('success');
  const haptic = useHaptic();

  const isFormValid = () => {
    return formData.type && formData.size && formData.color;
  };

  const handleSave = async () => {
    if (!isFormValid()) {
      setIsShaking(true);
      haptic.trigger('error');
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    if (!session) return;

    try {
      setIsSaving(true);

      // Save the entry
      await addEntry({
        timestamp: new Date().toISOString(),
        duration: session.duration || 0,
        ...formData,
      });

      // Show success feedback
      await Promise.all([sound.play(), haptic.trigger('success')]);
      setShowToast(true);

      // Navigate to history after a short delay
      setTimeout(() => {
        navigation.navigate('History');
      }, 1500);
    } catch (error) {
      console.error('Error saving entry:', error);
      // TODO: Show error toast
    } finally {
      setIsSaving(false);
    }
  };

  const shakeAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: isShaking
          ? withSequence(
              withTiming(10, { duration: 50 }),
              withTiming(-10, { duration: 50 }),
              withTiming(10, { duration: 50 }),
              withTiming(-10, { duration: 50 }),
              withTiming(0, { duration: 50 })
            )
          : 0,
      },
    ],
  }));

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Log</Text>
        {session?.duration && (
          <Text style={styles.duration}>
            Duration: {Math.floor(session.duration / 60)}:
            {(session.duration % 60).toString().padStart(2, '0')}
          </Text>
        )}
      </View>

      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Type</Text>
          <ShapeSelector
            value={formData.type}
            onChange={(type) => setFormData((prev) => ({ ...prev, type }))}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Size</Text>
          <SizeSlider
            value={formData.size}
            onChange={(size) => setFormData((prev) => ({ ...prev, size }))}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Color</Text>
          <ColorPicker
            value={formData.color}
            onChange={(color) => setFormData((prev) => ({ ...prev, color }))}
          />
        </View>
      </View>

      <Animated.View style={[styles.saveButtonContainer, shakeAnimation]}>
        <Animated.Pressable
          style={[
            styles.saveButton,
            !isFormValid() && styles.saveButtonDisabled,
            isSaving && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? 'Saving...' : 'Save'}
          </Text>
        </Animated.Pressable>
      </Animated.View>

      <Toast
        message="Entry saved successfully!"
        visible={showToast}
        onHide={() => setShowToast(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
  duration: {
    fontSize: 17,
    color: '#666',
    marginTop: 5,
  },
  form: {
    padding: 20,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginBottom: 8,
  },
  saveButtonContainer: {
    padding: 20,
  },
  saveButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 17,
    fontWeight: '600',
  },
}); 