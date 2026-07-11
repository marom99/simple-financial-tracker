import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, homeLayout, radii, spacing, typography } from '../theme';
import { formatRupiah } from '../utils/currency';
import { SpendingGauge } from './SpendingGauge';

interface SpendingCardProps {
  title: string;
  amount: number;
  limit: number;
  onPress?: () => void;
  accessibilityLabel?: string;
}

export function SpendingCard({
  title,
  amount,
  limit,
  onPress,
  accessibilityLabel,
}: SpendingCardProps) {
  const percent = limit > 0 ? Math.min(100, Math.round((amount / limit) * 100)) : 0;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.amount}>{formatRupiah(amount)}</Text>
      </View>

      <View style={styles.gaugeWrap}>
        <SpendingGauge percent={percent} />
      </View>

      <View style={styles.limitBlock}>
        <Text style={styles.limitLabel}>Spending Limit</Text>
        <Text style={styles.limitAmount}>{formatRupiah(limit)}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: homeLayout.cardWidth,
    height: homeLayout.cardHeight,
    borderRadius: radii.card,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    shadowColor: '#ECECEC',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 4,
  },
  pressed: {
    opacity: 0.92,
  },
  header: {
    position: 'absolute',
    left: 15,
    top: 11,
    gap: spacing.xs,
  },
  title: {
    ...typography.cardTitle,
    color: colors.textLabel,
  },
  amount: {
    ...typography.title3,
    color: colors.textPrimary,
  },
  gaugeWrap: {
    position: 'absolute',
    left: 0,
    top: 77,
    width: homeLayout.cardWidth,
    height: 58,
  },
  limitBlock: {
    position: 'absolute',
    top: 128,
    left: 0,
    right: 0,
    alignItems: 'center',
    gap: spacing.xs,
  },
  limitLabel: {
    ...typography.mini,
    color: colors.textHint,
  },
  limitAmount: {
    ...typography.smallMedium,
    color: colors.progress,
  },
});
