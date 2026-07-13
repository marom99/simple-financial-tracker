import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { formatSpendingCardAccessibilityLabel } from '../features/expenses/comparison';
import type { PeriodSummary, PeriodType } from '../features/expenses/types';
import { colors, hitSlop, radii, spacing, typography } from '../theme';
import { formatRupiah } from '../utils/currency';

const CHEVRON_SIZE = 18;

interface PeriodOverviewCardProps {
  today: PeriodSummary;
  week: PeriodSummary;
  month: PeriodSummary;
  onPressPeriod: (period: PeriodType) => void;
}

function ChevronRightIcon({ color }: { color: string }) {
  return (
    <View style={styles.chevron}>
      <Svg width={CHEVRON_SIZE} height={CHEVRON_SIZE} viewBox="0 0 24 24" fill="none">
        <Path
          d="m9 6 6 6-6 6"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
}

interface PeriodRowProps {
  title: string;
  summary: PeriodSummary;
  period: PeriodType;
  showDivider?: boolean;
  onPress: () => void;
}

function PeriodRow({
  title,
  summary,
  period,
  showDivider = true,
  onPress,
}: PeriodRowProps) {
  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={formatSpendingCardAccessibilityLabel(
          title,
          summary.total,
          period,
          summary.previousTotal,
        )}
        accessibilityHint="Opens spending breakdown"
        hitSlop={hitSlop}
        onPress={onPress}
        style={styles.row}
      >
        <Text style={styles.rowLabel} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.rowTrailing}>
          <Text numberOfLines={1} style={styles.rowAmount}>
            {formatRupiah(summary.total)}
          </Text>
          <ChevronRightIcon color={colors.textMuted} />
        </View>
      </Pressable>
      {showDivider ? <View style={styles.divider} /> : null}
    </>
  );
}

export function PeriodOverviewCard({
  today,
  week,
  month,
  onPressPeriod,
}: PeriodOverviewCardProps) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={formatSpendingCardAccessibilityLabel(
          'Today',
          today.total,
          'today',
          today.previousTotal,
        )}
        accessibilityHint="Opens spending breakdown"
        hitSlop={hitSlop}
        onPress={() => onPressPeriod('today')}
        style={({ pressed }) => [styles.header, pressed && styles.headerPressed]}
      >
        <Text style={styles.headerTitle}>Today</Text>
        <View style={styles.headerBody}>
          <Text numberOfLines={1} style={styles.headerAmount}>
            {formatRupiah(today.total)}
          </Text>
          <Text style={styles.headerSubtitle} numberOfLines={1}>
            {today.previousPeriodLine}
          </Text>
        </View>
      </Pressable>

      <View style={styles.list}>
        <PeriodRow
          title="This week"
          summary={week}
          period="week"
          onPress={() => onPressPeriod('week')}
        />
        <PeriodRow
          title="This month"
          summary={month}
          period="month"
          showDivider={false}
          onPress={() => onPressPeriod('month')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    width: '100%',
    borderRadius: radii.periodCard,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.periodHeader,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  headerPressed: {
    backgroundColor: colors.periodHeaderPressed,
  },
  headerTitle: {
    ...typography.periodMeta,
    color: colors.periodHeaderMuted,
    textAlign: 'center',
    alignSelf: 'stretch',
  },
  headerBody: {
    alignItems: 'center',
    gap: spacing.xs,
    width: '100%',
  },
  headerAmount: {
    ...typography.periodHero,
    color: colors.periodHeaderText,
    flexShrink: 1,
    textAlign: 'center',
    maxWidth: '100%',
  },
  headerSubtitle: {
    ...typography.periodMeta,
    fontWeight: '400',
    color: colors.periodHeaderMuted,
    textAlign: 'center',
    maxWidth: '100%',
  },
  list: {
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    minHeight: 56,
    gap: spacing.sm,
  },
  rowLabel: {
    ...typography.periodLabel,
    color: colors.textSecondary,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  rowTrailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 0,
    maxWidth: '48%',
  },
  rowAmount: {
    ...typography.tabularAmount,
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  chevron: {
    marginLeft: 1,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    marginLeft: spacing.md,
  },
});
