import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FloatingAddButton } from '../components/FloatingAddButton';
import { PeriodSummaryRow } from '../components/PeriodSummaryRow';
import { AddExpenseSheet } from '../features/expenses/AddExpenseSheet';
import { ExpenseBreakdownSheet } from '../features/expenses/ExpenseBreakdownSheet';
import { useExpenses } from '../features/expenses/ExpenseStoreContext';
import { buildAllPeriodSummaries } from '../features/expenses/selectors';
import type { PeriodSummary, PeriodType } from '../features/expenses/types';
import { colors, spacing, typography } from '../theme';
import { getGreeting } from '../utils/dateLabels';

const PERIOD_LABELS: Record<PeriodType, string> = {
  today: 'Today',
  week: 'Week',
  month: 'Month',
};

export function HomeScreen() {
  const expenses = useExpenses();
  const summaries = useMemo(() => buildAllPeriodSummaries(expenses), [expenses]);
  const [selectedSummary, setSelectedSummary] = useState<PeriodSummary | null>(null);
  const [addVisible, setAddVisible] = useState(false);

  const openBreakdown = (period: PeriodType) => {
    const summary = summaries.find((item) => item.period === period) ?? null;
    setSelectedSummary(summary);
  };

  const closeBreakdown = () => setSelectedSummary(null);

  const openAddFromBreakdown = () => {
    closeBreakdown();
    setAddVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.subtitle}>Your spending overview</Text>
        </View>

        <View style={styles.summarySection}>
          {summaries.map((summary, index) => (
            <PeriodSummaryRow
              key={summary.period}
              amount={summary.total}
              comparisonLabel={summary.comparisonLabel}
              label={PERIOD_LABELS[summary.period]}
              onPress={() => openBreakdown(summary.period)}
              showDivider={index < summaries.length - 1}
            />
          ))}
        </View>

        <View style={styles.tabBar}>
          <Text style={[styles.tabLabel, styles.tabActive]}>Home</Text>
          <Text style={styles.tabLabel}>Insights</Text>
          <Text style={styles.tabLabel}>Settings</Text>
        </View>

        <View style={styles.addButtonContainer}>
          <FloatingAddButton onPress={() => setAddVisible(true)} />
        </View>
      </View>

      <ExpenseBreakdownSheet
        onAddExpense={openAddFromBreakdown}
        onDismiss={closeBreakdown}
        summary={selectedSummary}
        visible={selectedSummary !== null}
      />

      <AddExpenseSheet onClose={() => setAddVisible(false)} visible={addVisible} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.xs,
  },
  greeting: {
    ...typography.greeting,
    color: colors.text,
  },
  subtitle: {
    ...typography.comparison,
    color: colors.textSecondary,
  },
  summarySection: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    marginBottom: spacing.xxl,
  },
  tabLabel: {
    ...typography.caption,
    color: colors.tabInactive,
  },
  tabActive: {
    color: colors.text,
    fontWeight: '600',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: spacing.xxl + spacing.lg,
    alignSelf: 'center',
  },
});
