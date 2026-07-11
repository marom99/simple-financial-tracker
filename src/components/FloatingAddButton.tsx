import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors, hitSlop, homeLayout, typography } from '../theme';

interface FloatingAddButtonProps {
  onPress: () => void;
}

function PlusIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 2.66667C8 1.95942 8.28095 1.28115 8.78105 0.781048C9.28115 0.280951 9.95942 0 10.6667 0H13.3333C14.0406 0 14.7189 0.280951 15.219 0.781048C15.719 1.28115 16 1.95942 16 2.66667V8H21.3333C22.0406 8 22.7189 8.28095 23.219 8.78105C23.719 9.28115 24 9.95942 24 10.6667V13.3333C24 14.0406 23.719 14.7189 23.219 15.219C22.7189 15.719 22.0406 16 21.3333 16H16V21.3333C16 22.0406 15.719 22.7189 15.219 23.219C14.7189 23.719 14.0406 24 13.3333 24H10.6667C9.95942 24 9.28115 23.719 8.78105 23.219C8.28095 22.7189 8 22.0406 8 21.3333V16H2.66667C1.95942 16 1.28115 15.719 0.781048 15.219C0.280951 14.7189 0 14.0406 0 13.3333V10.6667C0 9.95942 0.280951 9.28115 0.781048 8.78105C1.28115 8.28095 1.95942 8 2.66667 8H8V2.66667Z"
        fill={colors.background}
      />
    </Svg>
  );
}

export function FloatingAddButton({ onPress }: FloatingAddButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Add expense"
      hitSlop={hitSlop}
      onPress={onPress}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}
    >
      <View style={styles.button}>
        <PlusIcon />
      </View>
      <Text style={styles.label}>Scan</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 75,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.97 }],
  },
  button: {
    width: homeLayout.fabSize,
    height: homeLayout.fabSize,
    borderRadius: homeLayout.fabSize / 2,
    backgroundColor: colors.fab,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  label: {
    ...typography.scanLabel,
    color: colors.interactive,
    textAlign: 'center',
    marginTop: 4,
  },
});
