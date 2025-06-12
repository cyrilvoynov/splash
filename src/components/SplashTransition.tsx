import React, { useEffect } from 'react';
import { StyleSheet, View, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SplashAnimation } from './SplashAnimation';
import { useSound } from '../hooks/useSound';
import { useHaptic } from '../hooks/useHaptic';

interface SplashTransitionProps {
  visible: boolean;
  onComplete: () => void;
}

export const SplashTransition = ({ visible, onComplete }: SplashTransitionProps) => {
  const navigation = useNavigation();
  const sound = useSound('splash');
  const haptic = useHaptic();

  useEffect(() => {
    if (visible) {
      // Play sound and trigger haptic feedback when animation starts
      sound.play();
      haptic.trigger('heavy');
    }
  }, [visible]);

  const handleAnimationComplete = () => {
    // Navigate to form screen
    navigation.navigate('PoopForm');
    onComplete();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <SplashAnimation onComplete={handleAnimationComplete} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
}); 