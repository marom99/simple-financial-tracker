import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { ComparisonIndicatorData } from '../features/expenses/types';
import { colors, radii, spacing, typography } from '../theme';
import { formatRupiah } from '../utils/currency';
import { ComparisonIndicator } from './ComparisonIndicator';

interface SpendingCardProps {
  title: string;
  amount: number;
  comparison: ComparisonIndicatorData;
  previousPeriodLine: string;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function SpendingCard({
  title,
  amount,
  comparison,
  previousPeriodLine,
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
      <View style={styles.amountRow}>
        <Text style={styles.amount}>{formatRupiah(amount)}</Text>
        <ComparisonIndicator comparison={comparison} />
      </View>
      <Text style={styles.previousPeriod}>{previousPeriodLine}</Text>
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
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  amount: {
    ...typography.periodAmount,
    color: colors.textPrimary,
  },
  previousPeriod: {
    ...typography.comparison,
    color: colors.textSecondary,
  },
});
