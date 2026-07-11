import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Expense } from '../features/expenses/types';
import { colors, homeLayout, radii, spacing, typography } from '../theme';
import { formatExpenseAmount } from '../utils/currency';

const AVATAR_COLORS = [colors.avatarPink, colors.avatarPeach, colors.avatarBlue];

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function getAvatarColor(seed: string): string {
  return AVATAR_COLORS[hashString(seed) % AVATAR_COLORS.length];
}

function getInitial(label: string): string {
  return label.trim().charAt(0).toUpperCase() || '?';
}

interface HomeTransactionRowProps {
  expense: Expense;
}

export function HomeTransactionRow({ expense }: HomeTransactionRowProps) {
  const initial = getInitial(expense.label);
  const backgroundColor = getAvatarColor(expense.label || expense.category);

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        <View style={[styles.avatar, { backgroundColor }]}>
          <Text style={styles.initial}>{initial}</Text>
        </View>
        <Text style={styles.label} numberOfLines={1}>
          {expense.label}
        </Text>
      </View>
      <Text style={styles.amount}>{formatExpenseAmount(expense.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderRadius: 6,
    width: '100%',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexShrink: 1,
    paddingRight: spacing.sm,
  },
  avatar: {
    width: homeLayout.avatarSize,
    height: homeLayout.avatarSize,
    borderRadius: radii.avatar,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: {
    ...typography.micro,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  label: {
    ...typography.normal,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  amount: {
    ...typography.normal,
    color: colors.textPrimary,
  },
});
