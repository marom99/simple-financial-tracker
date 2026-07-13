import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloatingAddButton } from '../components/FloatingAddButton';
import { PeriodOverviewCard } from '../components/PeriodOverviewCard';
import { AddExpenseSheet } from '../features/expenses/AddExpenseSheet';
import { ExpenseBreakdownSheet } from '../features/expenses/ExpenseBreakdownSheet';
import { useExpenses } from '../features/expenses/ExpenseStoreContext';
import { buildPeriodSummary } from '../features/expenses/selectors';
import type { PeriodSummary, PeriodType } from '../features/expenses/types';
import { colors, homeLayout, spacing, typography } from '../theme';

export function HomeScreen() {
  const expenses = useExpenses();
  const insets = useSafeAreaInsets();
  const todaySummary = useMemo(() => buildPeriodSummary(expenses, 'today'), [expenses]);
  const weekSummary = useMemo(() => buildPeriodSummary(expenses, 'week'), [expenses]);
  const monthSummary = useMemo(() => buildPeriodSummary(expenses, 'month'), [expenses]);
  const [selectedSummary, setSelectedSummary] = useState<PeriodSummary | null>(null);
  const [addVisible, setAddVisible] = useState(false);

  const isEmptyOverview =
    todaySummary.total === 0 && weekSummary.total === 0 && monthSummary.total === 0;

  const openBreakdown = (period: PeriodType) => {
    const summaries: Record<PeriodType, PeriodSummary> = {
      today: todaySummary,
      week: weekSummary,
      month: monthSummary,
    };
    setSelectedSummary(summaries[period]);
  };

  const closeBreakdown = () => setSelectedSummary(null);

  const openAddFromBreakdown = () => {
    closeBreakdown();
    setAddVisible(true);
  };

  return (
    <View style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 96 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.contentFrame}>
            <Text style={styles.screenTitle}>Spending</Text>

            <View style={styles.cardsStack}>
              <PeriodOverviewCard
                month={monthSummary}
                onPressPeriod={openBreakdown}
                today={todaySummary}
                week={weekSummary}
              />
            </View>

            {isEmptyOverview ? (
              <Text style={styles.emptyHint}>No expenses yet — tap + to log your first</Text>
            ) : null}
          </View>
        </ScrollView>

        <View style={[styles.fabContainer, { bottom: Math.max(insets.bottom, 12) + 18 }]}>
          <FloatingAddButton onPress={() => setAddVisible(true)} />
        </View>
      </SafeAreaView>

      <ExpenseBreakdownSheet
        onAddExpense={openAddFromBreakdown}
        onDismiss={closeBreakdown}
        summary={selectedSummary}
        visible={selectedSummary !== null}
      />

      <AddExpenseSheet onClose={() => setAddVisible(false)} visible={addVisible} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
  },
  contentFrame: {
    width: '100%',
    maxWidth: homeLayout.contentMaxWidth,
    paddingHorizontal: homeLayout.horizontalPadding,
    paddingTop: homeLayout.screenTop,
  },
  screenTitle: {
    ...typography.screenLabel,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  cardsStack: {
    gap: homeLayout.cardGap,
  },
  emptyHint: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  fabContainer: {
    position: 'absolute',
    right: spacing.md,
  },
});
