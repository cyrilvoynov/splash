import React from 'react';
import { StyleSheet, Text, Pressable, Animated } from 'react-native';
import { usePoopContext } from '../context/PoopContext';
import { useHaptic } from '../hooks/useHaptic';
import { useSound } from '../hooks/useSound';

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const FloatingTimerCard = () => {
  const { session, endSession, timerOpacity } = usePoopContext();
  const haptic = useHaptic();
  const sound = useSound('splash');

  const scale = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      tension: 100,
      friction: 5,
    }).start();
  };

  const handleEndSession = async () => {
    await Promise.all([haptic.trigger('success'), sound.play()]);
    await endSession();
  };

  if (!session?.isActive) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: timerOpacity,
          transform: [{ scale }],
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handleEndSession}
        style={styles.card}
      >
        <Text style={styles.timer}>{formatTime(session.elapsedTime)}</Text>
        <Text style={styles.label}>Stop Splashing!</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timer: {
    fontSize: 32,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
}); 