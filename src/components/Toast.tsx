import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface ToastProps {
  message: string;
  visible: boolean;
  onHide: () => void;
}

export const Toast = ({ message, visible, onHide }: ToastProps) => {
  const translateY = useSharedValue(100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      translateY.value = withSequence(
        withSpring(0, { damping: 15 }),
        withTiming(100, { duration: 300 }, () => {
          onHide();
        })
      );
      opacity.value = withSequence(
        withTiming(1, { duration: 150 }),
        withTiming(1, { duration: 2000 }),
        withTiming(0, { duration: 150 })
      );
    }
  }, [visible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#FFF',
    fontSize: 16,
  },
}); 