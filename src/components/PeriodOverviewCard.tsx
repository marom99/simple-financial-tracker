import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
import { formatSpendingCardAccessibilityLabel } from '../features/expenses/comparison';
import type { PeriodSummary, PeriodType } from '../features/expenses/types';
import { colors, hitSlop, radii, spacing, typography } from '../theme';
import { formatRupiah } from '../utils/currency';
import { ComparisonIndicator } from './ComparisonIndicator';

const HEADER_ICON_SIZE = 52;
const ROW_ICON_SIZE = 22;
const CHEVRON_SIZE = 18;

type CalendarVariant = 'day' | 'week' | 'month';

interface PeriodOverviewCardProps {
  today: PeriodSummary;
  week: PeriodSummary;
  month: PeriodSummary;
  onPressPeriod: (period: PeriodType) => void;
}

function CalendarIcon({
  color,
  size,
  variant,
}: {
  color: string;
  size: number;
  variant: CalendarVariant;
}) {
  const marks =
    variant === 'day' ? (
      <Path
        d="M8 14h2M12 14h2M16 14h2M8 17h2M12 17h2"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    ) : variant === 'week' ? (
      <Path
        d="M7 14h10"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    ) : (
      <Path
        d="M7 14h2.5M11.25 14h2.5M15.5 14H18M7 17h2.5M11.25 17h2.5M15.5 17H18"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
    );

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x={3}
        y={5}
        width={18}
        height={16}
        rx={2}
        stroke={color}
        strokeWidth={1.75}
      />
      <Path d="M3 10h18" stroke={color} strokeWidth={1.75} strokeLinecap="round" />
      <Path
        d="M8 3v4M16 3v4"
        stroke={color}
        strokeWidth={1.75}
        strokeLinecap="round"
      />
      {marks}
    </Svg>
  );
}

function ChevronRightIcon({ color }: { color: string }) {
  return (
    <Svg width={CHEVRON_SIZE} height={CHEVRON_SIZE} viewBox="0 0 24 24" fill="none">
      <Path
        d="m9 6 6 6-6 6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

interface PeriodRowProps {
  title: string;
  summary: PeriodSummary;
  period: PeriodType;
  variant: CalendarVariant;
  showDivider?: boolean;
  onPress: () => void;
}

function PeriodRow({
  title,
  summary,
  period,
  variant,
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
        style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
      >
        <View style={styles.rowLeading}>
          <View style={styles.rowIcon}>
            <CalendarIcon color={colors.periodHeader} size={ROW_ICON_SIZE} variant={variant} />
          </View>
          <Text style={styles.rowLabel} numberOfLines={1}>
            {title}
          </Text>
        </View>
        <View style={styles.rowTrailing}>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.75}
            numberOfLines={1}
            style={styles.rowAmount}
          >
            {formatRupiah(summary.total)}
          </Text>
          <ChevronRightIcon color={colors.textHint} />
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
        <View style={styles.headerIconCircle}>
          <CalendarIcon color={colors.periodHeader} size={26} variant="day" />
        </View>
        <Text style={styles.headerTitle}>Today</Text>
        <View style={styles.headerAmountRow}>
          <Text
            adjustsFontSizeToFit
            minimumFontScale={0.72}
            numberOfLines={1}
            style={styles.headerAmount}
          >
            {formatRupiah(today.total)}
          </Text>
          <ComparisonIndicator appearance="onDark" comparison={today.comparison} />
        </View>
        <Text style={styles.headerSubtitle} numberOfLines={1}>
          {today.previousPeriodLine}
        </Text>
      </Pressable>

      <View style={styles.list}>
        <PeriodRow
          title="This week"
          summary={week}
          period="week"
          variant="week"
          onPress={() => onPressPeriod('week')}
        />
        <PeriodRow
          title="This month"
          summary={month}
          period="month"
          variant="month"
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
    overflow: 'hidden',
  },
  header: {
    backgroundColor: colors.periodHeader,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md + spacing.xs,
    gap: spacing.xs,
  },
  headerPressed: {
    backgroundColor: colors.periodHeader,
    opacity: 0.94,
  },
  headerIconCircle: {
    width: HEADER_ICON_SIZE,
    height: HEADER_ICON_SIZE,
    borderRadius: HEADER_ICON_SIZE / 2,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  headerTitle: {
    ...typography.title3,
    fontWeight: '600',
    color: colors.periodHeaderText,
    textAlign: 'center',
  },
  headerAmountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    width: '100%',
    maxWidth: '100%',
    paddingHorizontal: spacing.xs,
  },
  headerAmount: {
    ...typography.periodAmount,
    fontSize: 28,
    lineHeight: 34,
    color: colors.periodHeaderText,
    flexShrink: 1,
    textAlign: 'center',
  },
  headerSubtitle: {
    ...typography.comparison,
    color: colors.periodHeaderMuted,
    textAlign: 'center',
    maxWidth: '100%',
  },
  list: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: colors.periodHeader,
    borderBottomLeftRadius: radii.periodCard,
    borderBottomRightRadius: radii.periodCard,
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
  rowPressed: {
    backgroundColor: colors.periodRowPressed,
  },
  rowLeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
    flexShrink: 1,
    minWidth: 0,
  },
  rowIcon: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rowLabel: {
    ...typography.periodLabel,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  rowTrailing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 0,
    maxWidth: '48%',
  },
  rowAmount: {
    ...typography.periodAmount,
    fontSize: 17,
    lineHeight: 22,
    color: colors.textPrimary,
    textAlign: 'right',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
    marginLeft: spacing.md + 28 + spacing.sm,
  },
});
