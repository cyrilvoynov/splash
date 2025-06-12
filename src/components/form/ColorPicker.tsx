import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import { useHaptic } from '../../hooks/useHaptic';
import { useSound } from '../../hooks/useSound';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const COLORS = [
  { label: 'Light Brown', value: '#D2B48C' },
  { label: 'Brown', value: '#8B4513' },
  { label: 'Dark Brown', value: '#3E2723' },
  { label: 'Green', value: '#4CAF50' },
  { label: 'Yellow', value: '#FFC107' },
  { label: 'Red', value: '#F44336' },
  { label: 'Gray', value: '#9E9E9E' },
];

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

export const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  const haptic = useHaptic();
  const sound = useSound('tap');

  const handleSelect = async (color: string) => {
    await Promise.all([haptic.trigger('light'), sound.play()]);
    onChange(color);
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {COLORS.map((color) => {
          const isSelected = color.value === value;

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              {
                scale: withSpring(isSelected ? 1.1 : 1, {
                  damping: 10,
                  stiffness: 100,
                }),
              },
            ],
            borderWidth: withTiming(isSelected ? 3 : 0, { duration: 150 }),
          }));

          return (
            <AnimatedPressable
              key={color.value}
              style={[styles.colorButton, animatedStyle]}
              onPress={() => handleSelect(color.value)}
            >
              <View
                style={[styles.colorPreview, { backgroundColor: color.value }]}
              />
              <Text style={styles.colorLabel}>{color.label}</Text>
            </AnimatedPressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  colorButton: {
    width: '30%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  colorPreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 4,
  },
  colorLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
}); 