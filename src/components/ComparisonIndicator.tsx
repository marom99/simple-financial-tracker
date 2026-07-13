import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { ComparisonDirection, ComparisonIndicatorData } from '../features/expenses/types';
import { colors, spacing, typography } from '../theme';

const ICON_SIZE = 14;
const ICON_CIRCLE_SIZE = 22;

interface ComparisonColors {
  icon: string;
  circle: string;
}

type ComparisonAppearance = 'default' | 'onDark';

function getComparisonColors(
  direction: ComparisonDirection,
  appearance: ComparisonAppearance,
): ComparisonColors {
  if (appearance === 'onDark') {
    switch (direction) {
      case 'up':
        return {
          icon: colors.comparisonOnDarkUp,
          circle: colors.comparisonOnDarkUpCircle,
        };
      case 'down':
        return {
          icon: colors.comparisonOnDarkDown,
          circle: colors.comparisonOnDarkDownCircle,
        };
      case 'flat':
        return {
          icon: colors.comparisonOnDarkFlat,
          circle: colors.comparisonOnDarkFlatCircle,
        };
    }
  }

  switch (direction) {
    case 'up':
      return { icon: colors.danger, circle: 'rgba(198, 40, 40, 0.14)' };
    case 'down':
      return { icon: colors.progress, circle: 'rgba(89, 204, 1, 0.16)' };
    case 'flat':
      return { icon: colors.danger, circle: 'rgba(198, 40, 40, 0.14)' };
  }
}

interface ComparisonIndicatorProps {
  comparison: ComparisonIndicatorData;
  appearance?: ComparisonAppearance;
}

function TrendingUpIcon({ color }: { color: string }) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 7h6v6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m22 7-8.5 8.5-5-5L2 17"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function TrendingDownIcon({ color }: { color: string }) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none">
      <Path
        d="M16 17h6v-6"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="m22 17-8.5-8.5-5 5L2 7"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function MinusIcon({ color }: { color: string }) {
  return (
    <Svg width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 12h14"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ComparisonIcon({
  comparison,
  color,
}: {
  comparison: ComparisonIndicatorData;
  color: string;
}) {
  switch (comparison.direction) {
    case 'up':
      return <TrendingUpIcon color={color} />;
    case 'down':
      return <TrendingDownIcon color={color} />;
    case 'flat':
      return <MinusIcon color={color} />;
  }
}

export function ComparisonIndicator({
  comparison,
  appearance = 'default',
}: ComparisonIndicatorProps) {
  const statusColors = getComparisonColors(comparison.direction, appearance);

  return (
    <View accessible={false} style={styles.row}>
      <View style={[styles.iconCircle, { backgroundColor: statusColors.circle }]}>
        <ComparisonIcon color={statusColors.icon} comparison={comparison} />
      </View>
      {comparison.percent !== null ? (
        <Text style={[styles.percent, { color: statusColors.icon }]}>
          {`${comparison.percent}%`}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexShrink: 0,
  },
  iconCircle: {
    width: ICON_CIRCLE_SIZE,
    height: ICON_CIRCLE_SIZE,
    borderRadius: ICON_CIRCLE_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percent: {
    ...typography.comparison,
  },
});
