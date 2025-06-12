import React, { useCallback } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import {
  Canvas,
  Circle,
  Group,
  Paint,
  useValue,
  runTiming,
  BlurMask,
  vec,
  useComputedValue,
  Easing,
} from '@shopify/react-native-skia';

interface Particle {
  x: number;
  y: number;
  radius: number;
  velocity: { x: number; y: number };
  opacity: number;
}

interface SplashAnimationProps {
  color?: string;
  onAnimationComplete?: () => void;
}

export const SplashAnimation = ({
  color = '#2196F3',
  onAnimationComplete,
}: SplashAnimationProps) => {
  const { width, height } = useWindowDimensions();
  const centerX = width / 2;
  const centerY = height / 2;

  // Main splash animation values
  const scale = useValue(0);
  const opacity = useValue(1);

  // Particle system
  const NUM_PARTICLES = 20;
  const particles: Particle[] = Array.from({ length: NUM_PARTICLES }).map(() => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    return {
      x: centerX,
      y: centerY,
      radius: 4 + Math.random() * 8,
      velocity: {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
      },
      opacity: 0.6 + Math.random() * 0.4,
    };
  });

  const particlePositions = particles.map(() => ({
    x: useValue(0),
    y: useValue(0),
    opacity: useValue(1),
  }));

  // Compute particle positions
  const particleGroups = useComputedValue(() => {
    return particlePositions.map((pos, i) => {
      const particle = particles[i];
      const progress = scale.current;

      // Update particle position based on velocity and time
      const x = centerX + particle.velocity.x * progress * 100;
      const y = centerY + particle.velocity.y * progress * 100;

      // Update opacity based on distance from center
      const distance = Math.sqrt(
        Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2)
      );
      const maxDistance = Math.min(width, height) / 2;
      const opacityValue = Math.max(
        0,
        1 - (distance / maxDistance) * progress
      );

      pos.x.current = x;
      pos.y.current = y;
      pos.opacity.current = opacityValue * particle.opacity;

      return {
        x: x,
        y: y,
        radius: particle.radius,
        opacity: opacityValue * particle.opacity,
      };
    });
  }, [scale]);

  // Start animation
  const startAnimation = useCallback(() => {
    // Main splash animation
    runTiming(scale, 1, {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Fade out
    runTiming(
      opacity,
      0,
      {
        duration: 800,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      },
      () => {
        onAnimationComplete?.();
      }
    );
  }, []);

  // Start animation on mount
  React.useEffect(() => {
    startAnimation();
  }, []);

  return (
    <Canvas style={styles.canvas}>
      {/* Main splash */}
      <Group opacity={opacity}>
        <Circle cx={centerX} cy={centerY} r={100} color={color}>
          <BlurMask blur={20} style="normal" />
        </Circle>
      </Group>

      {/* Particles */}
      <Group opacity={opacity}>
        {particleGroups.current.map((particle, index) => (
          <Circle
            key={index}
            cx={particle.x}
            cy={particle.y}
            r={particle.radius}
            color={color}
            opacity={particle.opacity}
          >
            <BlurMask blur={4} style="normal" />
            <Paint style="fill" opacity={0.8} />
          </Circle>
        ))}
      </Group>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
  },
}); 