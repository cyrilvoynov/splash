import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StartSplashButton } from '../components/StartSplashButton';
import { FloatingTimerCard } from '../components/FloatingTimerCard';
import { SplashTransition } from '../components/SplashTransition';
import { usePoopContext } from '../context/PoopContext';

export const HomeScreen = () => {
  const { session } = usePoopContext();
  const [showSplash, setShowSplash] = useState(false);

  // Show splash animation when session ends
  React.useEffect(() => {
    if (session && !session.isActive && session.endTime) {
      setShowSplash(true);
    }
  }, [session]);

  return (
    <View style={styles.container}>
      <StartSplashButton />
      <FloatingTimerCard />
      <SplashTransition
        visible={showSplash}
        onComplete={() => setShowSplash(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
}); 