import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, hitSlop, radii } from '../theme';

interface FloatingAddButtonProps {
  onPress: () => void;
}

export function FloatingAddButton({ onPress }: FloatingAddButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add expense"
      hitSlop={hitSlop}
      onPress={onPress}
      style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
    >
      <Text style={styles.icon}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 64,
    height: 64,
    borderRadius: radii.button,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  icon: {
    color: colors.background,
    fontSize: 32,
    lineHeight: 34,
    fontWeight: '300',
  },
});
