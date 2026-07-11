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
import { HomeTransactionRow } from '../components/HomeTransactionRow';
import { SpendingCard } from '../components/SpendingCard';
import { AddExpenseSheet } from '../features/expenses/AddExpenseSheet';
import { ExpenseBreakdownSheet } from '../features/expenses/ExpenseBreakdownSheet';
import { useExpenses } from '../features/expenses/ExpenseStoreContext';
import { buildPeriodSummary } from '../features/expenses/selectors';
import type { PeriodSummary, PeriodType } from '../features/expenses/types';
import { colors, homeLayout, spacing, spendingLimits, typography } from '../theme';
import { formatTodaySectionLabel } from '../utils/dateLabels';

const DISPLAY_NAME = 'Frederic';
const HEADER_GRADIENT = require('../../assets/home/header-gradient.png');

export function HomeScreen() {
  const expenses = useExpenses();
  const insets = useSafeAreaInsets();
  const todaySummary = useMemo(() => buildPeriodSummary(expenses, 'today'), [expenses]);
  const weekSummary = useMemo(() => buildPeriodSummary(expenses, 'week'), [expenses]);
  const [selectedSummary, setSelectedSummary] = useState<PeriodSummary | null>(null);
  const [addVisible, setAddVisible] = useState(false);

  const openBreakdown = (period: PeriodType) => {
    setSelectedSummary(period === 'today' ? todaySummary : weekSummary);
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

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsRow}
            decelerationRate="fast"
            snapToInterval={homeLayout.cardWidth + homeLayout.cardGap}
            snapToAlignment="start"
          >
            <SpendingCard
              accessibilityLabel={`Today, ${todaySummary.total}`}
              amount={todaySummary.total}
              limit={spendingLimits.today}
              onPress={() => openBreakdown('today')}
              title="Today spent"
            />
            <SpendingCard
              accessibilityLabel={`Week, ${weekSummary.total}`}
              amount={weekSummary.total}
              limit={spendingLimits.week}
              onPress={() => openBreakdown('week')}
              title="Weekly spent"
            />
          </ScrollView>

          <View style={styles.listSection}>
            <Text style={styles.dateLabel}>{formatTodaySectionLabel()}</Text>
            <View style={styles.list}>
              {todaySummary.expenses.length === 0 ? (
                <Text style={styles.emptyList}>No expenses today</Text>
              ) : (
                todaySummary.expenses.map((expense) => (
                  <HomeTransactionRow key={expense.id} expense={expense} />
                ))
              )}
            </View>
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
    ...typography.title3,
    color: colors.textPrimary,
    marginLeft: homeLayout.horizontalPadding + 1,
    marginTop: homeLayout.greetingTop,
    marginBottom: spacing.md,
  },
  cardsRow: {
    paddingLeft: homeLayout.horizontalPadding,
    paddingRight: homeLayout.horizontalPadding,
    gap: homeLayout.cardGap,
  },
  listSection: {
    marginTop: homeLayout.listTop,
    paddingHorizontal: homeLayout.horizontalPadding,
    gap: 12,
  },
  dateLabel: {
    ...typography.small,
    color: colors.textMuted,
  },
  list: {
    gap: spacing.sm,
  },
  emptyList: {
    ...typography.normal,
    color: colors.textHint,
    paddingVertical: spacing.sm,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
  },
});
