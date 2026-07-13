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
import { PeriodOverviewCard } from '../components/PeriodOverviewCard';
import { AddExpenseSheet } from '../features/expenses/AddExpenseSheet';
import { ExpenseBreakdownSheet } from '../features/expenses/ExpenseBreakdownSheet';
import { useExpenses } from '../features/expenses/ExpenseStoreContext';
import { buildPeriodSummary } from '../features/expenses/selectors';
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
          <View style={styles.contentFrame}>
            <Text style={styles.greeting}>{`Hi, ${DISPLAY_NAME} ☺️`}</Text>

            <View style={styles.cardsStack}>
              <PeriodOverviewCard
                month={monthSummary}
                onPressPeriod={openBreakdown}
                today={todaySummary}
                week={weekSummary}
              />
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
    alignItems: 'center',
  },
  contentFrame: {
    width: '100%',
    maxWidth: homeLayout.contentMaxWidth,
    paddingHorizontal: homeLayout.horizontalPadding,
    paddingTop: homeLayout.greetingTop,
  },
  greeting: {
    ...typography.greeting,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  cardsStack: {
    gap: homeLayout.cardGap,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
  },
});
