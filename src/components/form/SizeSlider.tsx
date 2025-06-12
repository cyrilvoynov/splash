import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { useHaptic } from '../../hooks/useHaptic';
import { useSound } from '../../hooks/useSound';

const SIZES = [
  { id: 1, label: 'Small', value: 0 },
  { id: 2, label: 'Medium', value: 0.5 },
  { id: 3, label: 'Large', value: 1 },
];

interface SizeSliderProps {
  value: number;
  onChange: (size: number) => void;
}

export const SizeSlider = ({ value, onChange }: SizeSliderProps) => {
  const haptic = useHaptic();
  const sound = useSound('tap');
  const progress = useSharedValue(value);

  const handleValueChange = async (newValue: number) => {
    await Promise.all([haptic.trigger('light'), sound.play()]);
    onChange(newValue);
  };

  const gesture = Gesture.Pan()
    .onUpdate((e) => {
      const newProgress = Math.max(0, Math.min(1, progress.value + e.changeX / 200));
      progress.value = newProgress;
    })
    .onEnd(() => {
      // Snap to nearest size
      const nearestSize = SIZES.reduce((prev, curr) =>
        Math.abs(curr.value - progress.value) < Math.abs(prev.value - progress.value)
          ? curr
          : prev
      );
      progress.value = withSpring(nearestSize.value, { damping: 15 });
      runOnJS(handleValueChange)(nearestSize.id);
    });

  const sliderStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(progress.value, [0, 1], [0, 200]) }],
  }));

  const getCurrentSize = () => {
    return SIZES.find((size) => size.id === value) || SIZES[1];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{getCurrentSize().label}</Text>
      <GestureDetector gesture={gesture}>
        <View style={styles.sliderContainer}>
          <View style={styles.track} />
          <Animated.View style={[styles.thumb, sliderStyle]} />
          <View style={styles.markersContainer}>
            {SIZES.map((size) => (
              <View key={size.id} style={styles.marker} />
            ))}
          </View>
        </View>
      </GestureDetector>
      <View style={styles.labelsContainer}>
        {SIZES.map((size) => (
          <Text key={size.id} style={styles.markerLabel}>
            {size.label}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 20,
    textAlign: 'center',
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
  },
  thumb: {
    position: 'absolute',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  markersContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  marker: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#BDBDBD',
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  markerLabel: {
    fontSize: 12,
    color: '#666',
  },
}); 