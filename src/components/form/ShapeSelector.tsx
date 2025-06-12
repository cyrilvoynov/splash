import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { useHaptic } from '../../hooks/useHaptic';
import { useSound } from '../../hooks/useSound';
import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const SHAPES = [
  { id: 1, label: 'Type 1', description: 'Separate hard lumps', emoji: '💩' },
  { id: 2, label: 'Type 2', description: 'Lumpy and sausage-like', emoji: '💩' },
  { id: 3, label: 'Type 3', description: 'Sausage with cracks', emoji: '💩' },
  { id: 4, label: 'Type 4', description: 'Smooth and soft', emoji: '💩' },
  { id: 5, label: 'Type 5', description: 'Soft blobs', emoji: '💩' },
  { id: 6, label: 'Type 6', description: 'Mushy consistency', emoji: '💩' },
  { id: 7, label: 'Type 7', description: 'Liquid consistency', emoji: '💩' },
];

interface ShapeSelectorProps {
  value: number;
  onChange: (shape: number) => void;
}

export const ShapeSelector = ({ value, onChange }: ShapeSelectorProps) => {
  const haptic = useHaptic();
  const sound = useSound('tap');

  const handleSelect = async (shape: number) => {
    await Promise.all([haptic.trigger('light'), sound.play()]);
    onChange(shape);
  };

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {SHAPES.map((shape) => {
        const isSelected = shape.id === value;

        const animatedStyle = useAnimatedStyle(() => ({
          transform: [
            {
              scale: withSpring(isSelected ? 1.05 : 1, {
                damping: 10,
                stiffness: 100,
              }),
            },
          ],
          backgroundColor: withSpring(
            isSelected ? 'rgba(33, 150, 243, 0.1)' : '#FFF',
          ),
        }));

        return (
          <AnimatedPressable
            key={shape.id}
            style={[styles.shapeButton, animatedStyle]}
            onPress={() => handleSelect(shape.id)}
          >
            <Text style={styles.emoji}>{shape.emoji}</Text>
            <Text style={styles.label}>{shape.label}</Text>
            <Text style={styles.description}>{shape.description}</Text>
          </AnimatedPressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    gap: 10,
  },
  shapeButton: {
    width: 150,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
}); 