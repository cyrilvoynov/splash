import React from 'react';
import { StyleSheet, Pressable, Text, Animated } from 'react-native';
import { usePoopContext } from '../context/PoopContext';
import { useHaptic } from '../hooks/useHaptic';
import { useSound } from '../hooks/useSound';

export const StartSplashButton = () => {
  const { startSession, session } = usePoopContext();
  const haptic = useHaptic();
  const sound = useSound('tap');

  // Animation values
  const scale = React.useRef(new Animated.Value(1)).current;
  const opacity = React.useRef(new Animated.Value(1)).current;

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

  const handlePress = async () => {
    // Trigger haptic and sound feedback
    await Promise.all([haptic.trigger('medium'), sound.play()]);

    // Animate button out
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Start session
    await startSession();
  };

  if (session?.isActive) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale }],
          opacity,
        },
      ]}
    >
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={styles.button}
      >
        <Text style={styles.text}>Start Splashing!</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  text: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '600',
  },
}); 