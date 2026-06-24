import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { PeriodSummary } from './types';
import { ExpenseListItem } from './ExpenseListItem';
import { GlassBottomSheet } from '../../components/GlassBottomSheet';
import { colors, spacing, typography } from '../../theme';
import { formatRupiah } from '../../utils/currency';
import { getPeriodTitle } from '../../utils/dateLabels';

interface ExpenseBreakdownSheetProps {
  summary: PeriodSummary | null;
  visible: boolean;
  onDismiss: () => void;
  onAddExpense: () => void;
}

export function ExpenseBreakdownSheet({
  summary,
  visible,
  onDismiss,
  onAddExpense,
}: ExpenseBreakdownSheetProps) {
  if (!summary) {
    return null;
  }

  const title = getPeriodTitle(summary.period);
  const isEmpty = summary.expenses.length === 0;

  return (
    <GlassBottomSheet onDismiss={onDismiss} visible={visible}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.total}>{formatRupiah(summary.total)} spent</Text>
      </View>

      {isEmpty ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>No expenses yet</Text>
          <Text style={styles.emptyBody}>Add your first expense for {title.toLowerCase()}.</Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Add expense from breakdown"
            onPress={onAddExpense}
            style={styles.emptyButton}
          >
            <Text style={styles.emptyButtonText}>Add expense</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={summary.expenses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ExpenseListItem expense={item} />}
          style={styles.list}
        />
      )}
    </GlassBottomSheet>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  title: {
    ...typography.sheetTitle,
    color: colors.text,
  },
  total: {
    ...typography.comparison,
    color: colors.textSecondary,
  },
  list: {
    maxHeight: 360,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: spacing.sm,
  },
  emptyTitle: {
    ...typography.periodAmount,
    color: colors.text,
  },
  emptyBody: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.accent,
  },
  emptyButtonText: {
    ...typography.body,
    color: colors.background,
    fontWeight: '600',
  },
});
