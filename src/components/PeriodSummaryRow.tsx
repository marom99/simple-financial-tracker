import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { formatRupiah } from '../utils/currency';

interface PeriodSummaryRowProps {
  label: string;
  amount: number;
  comparisonLabel: string | null;
  onPress: () => void;
  showDivider?: boolean;
}

export function PeriodSummaryRow({
  label,
  amount,
  comparisonLabel,
  onPress,
  showDivider = true,
}: PeriodSummaryRowProps) {
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}, ${formatRupiah(amount)} spent`}
        onPress={onPress}
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      >
        <View style={styles.left}>
          <Text style={styles.label}>{label}</Text>
          {comparisonLabel ? <Text style={styles.comparison}>{comparisonLabel}</Text> : null}
        </View>
        <Text style={styles.amount}>{formatRupiah(amount)}</Text>
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    minHeight: 56,
  },
  rowPressed: {
    opacity: 0.7,
  },
  left: {
    flex: 1,
    gap: spacing.xs,
  },
  label: {
    ...typography.periodLabel,
    color: colors.text,
  },
  comparison: {
    ...typography.comparison,
    color: colors.textSecondary,
  },
  amount: {
    ...typography.periodAmount,
    color: colors.text,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
});
