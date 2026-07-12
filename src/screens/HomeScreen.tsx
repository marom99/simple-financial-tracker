import React, { useMemo, useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FloatingAddButton } from '../components/FloatingAddButton';
import { SpendingCard } from '../components/SpendingCard';
import { AddExpenseSheet } from '../features/expenses/AddExpenseSheet';
import { ExpenseBreakdownSheet } from '../features/expenses/ExpenseBreakdownSheet';
import { useExpenses } from '../features/expenses/ExpenseStoreContext';
import { buildPeriodSummary } from '../features/expenses/selectors';
import { formatSpendingCardAccessibilityLabel } from '../features/expenses/comparison';
import type { PeriodSummary, PeriodType } from '../features/expenses/types';
import { colors, homeLayout, spacing, typography } from '../theme';

const DISPLAY_NAME = 'Frederic';
const HEADER_GRADIENT = require('../../assets/home/header-gradient.png');

export function HomeScreen() {
  const expenses = useExpenses();
  const insets = useSafeAreaInsets();
  const todaySummary = useMemo(() => buildPeriodSummary(expenses, 'today'), [expenses]);
  const weekSummary = useMemo(() => buildPeriodSummary(expenses, 'week'), [expenses]);
  const monthSummary = useMemo(() => buildPeriodSummary(expenses, 'month'), [expenses]);
  const [selectedSummary, setSelectedSummary] = useState<PeriodSummary | null>(null);
  const [addVisible, setAddVisible] = useState(false);

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
      <Image source={HEADER_GRADIENT} style={styles.gradient} resizeMode="cover" />

      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 96 },
          ]}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.greeting}>{`Hi, ${DISPLAY_NAME} ☺️`}</Text>

          <View style={styles.cardsStack}>
            <SpendingCard
              accessibilityLabel={formatSpendingCardAccessibilityLabel(
                'Today',
                todaySummary.total,
                'today',
                todaySummary.previousTotal,
              )}
              amount={todaySummary.total}
              comparison={todaySummary.comparison}
              onPress={() => openBreakdown('today')}
              previousPeriodLine={todaySummary.previousPeriodLine}
              title="Today"
            />
            <SpendingCard
              accessibilityLabel={formatSpendingCardAccessibilityLabel(
                'This week',
                weekSummary.total,
                'week',
                weekSummary.previousTotal,
              )}
              amount={weekSummary.total}
              comparison={weekSummary.comparison}
              onPress={() => openBreakdown('week')}
              previousPeriodLine={weekSummary.previousPeriodLine}
              title="This week"
            />
            <SpendingCard
              accessibilityLabel={formatSpendingCardAccessibilityLabel(
                'This month',
                monthSummary.total,
                'month',
                monthSummary.previousTotal,
              )}
              amount={monthSummary.total}
              comparison={monthSummary.comparison}
              onPress={() => openBreakdown('month')}
              previousPeriodLine={monthSummary.previousPeriodLine}
              title="This month"
            />
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
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    height: 256,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  greeting: {
    ...typography.greeting,
    color: colors.textPrimary,
    marginLeft: homeLayout.horizontalPadding + 1,
    marginTop: homeLayout.greetingTop,
    marginBottom: spacing.md,
  },
  cardsStack: {
    paddingHorizontal: homeLayout.horizontalPadding,
    gap: homeLayout.cardGap,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
  },
});
