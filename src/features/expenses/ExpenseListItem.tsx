import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { Expense } from './types';
import { getCategoryInitial } from './categoryDefaults';
import { colors, radii, spacing, typography } from '../../theme';
import { formatExpenseAmount } from '../../utils/currency';

interface ExpenseListItemProps {
  expense: Expense;
}

export function ExpenseListItem({ expense }: ExpenseListItemProps) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{getCategoryInitial(expense.category)}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.label}>{expense.label}</Text>
        <Text style={styles.category}>{expense.category}</Text>
      </View>
      <Text style={styles.amount}>{formatExpenseAmount(expense.amount)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    gap: spacing.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.category,
    backgroundColor: colors.categoryBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  label: {
    ...typography.body,
    color: colors.text,
  },
  category: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  amount: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
});
