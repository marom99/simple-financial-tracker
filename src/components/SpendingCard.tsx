import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { colors, radii, spacing, typography } from '../theme';
import { formatRupiah } from '../utils/currency';

interface SpendingCardProps {
  title: string;
  amount: number;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function SpendingCard({
  title,
  amount,
  onPress,
  accessibilityLabel,
}: SpendingCardProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.amount}>{formatRupiah(amount)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    width: '100%',
    borderRadius: radii.card,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 15,
    paddingVertical: spacing.md,
    gap: spacing.xs,
    shadowColor: '#ECECEC',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 4,
  },
  pressed: {
    opacity: 0.92,
  },
  title: {
    ...typography.periodLabel,
    color: colors.textLabel,
  },
  amount: {
    ...typography.periodAmount,
    color: colors.textPrimary,
  },
});
