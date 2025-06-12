import { Audio } from 'expo-av';
import { useCallback, useEffect, useRef } from 'react';

type SoundType = 'tap' | 'splash' | 'success' | 'error';

const SOUND_FILES = {
  tap: require('../../assets/sounds/tap.mp3'),
  splash: require('../../assets/sounds/splash.mp3'),
  success: require('../../assets/sounds/success.mp3'),
  error: require('../../assets/sounds/error.mp3'),
};

export const useSound = (type: SoundType) => {
  const sound = useRef<Audio.Sound>();

  useEffect(() => {
    const loadSound = async () => {
      const { sound: audioSound } = await Audio.Sound.createAsync(SOUND_FILES[type], {
        shouldPlay: false,
        isMuted: false,
        volume: 0.5,
      });
      sound.current = audioSound;
    };

    loadSound();

    return () => {
      sound.current?.unloadAsync();
    };
  }, [type]);

  const play = useCallback(async () => {
    try {
      await sound.current?.playFromPositionAsync(0);
    } catch (error) {
      console.warn('Error playing sound:', error);
    }
  }, []);

  return { play };
}; 