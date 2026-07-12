import { formatRupiah } from '../../utils/currency';
import type { ComparisonIndicatorData, PeriodType } from './types';

export function getPreviousPeriodLabel(period: PeriodType): string {
  switch (period) {
    case 'today':
      return 'Yesterday';
    case 'week':
      return 'Last week';
    case 'month':
      return 'Last month';
  }
}

function getPreviousPeriodReference(period: PeriodType): string {
  switch (period) {
    case 'today':
      return 'yesterday';
    case 'week':
      return 'last week';
    case 'month':
      return 'last month';
  }
}

export function buildComparisonIndicator(
  current: number,
  previous: number,
): ComparisonIndicatorData {
  if (previous === 0) {
    if (current === 0) {
      return { direction: 'flat', percent: 0 };
    }
    return { direction: 'up', percent: null };
  }

  const change = Math.round(((current - previous) / previous) * 100);
  if (change === 0) {
    return { direction: 'flat', percent: 0 };
  }
  if (change > 0) {
    return { direction: 'up', percent: change };
  }
  return { direction: 'down', percent: Math.abs(change) };
}

export function formatPreviousPeriodLine(period: PeriodType, amount: number): string {
  return `${getPreviousPeriodLabel(period)}: ${formatRupiah(amount)}`;
}

export function formatComparisonAccessibilityPhrase(
  period: PeriodType,
  current: number,
  previous: number,
): string {
  const reference = getPreviousPeriodReference(period);

  if (previous === 0 && current > 0) {
    return `higher than ${reference}`;
  }
  if (current === previous) {
    return `same as ${reference}`;
  }

  const change = Math.round(((current - previous) / previous) * 100);
  if (change > 0) {
    return `${change}% higher than ${reference}`;
  }
  return `${Math.abs(change)}% lower than ${reference}`;
}

export function formatSpendingCardAccessibilityLabel(
  title: string,
  total: number,
  period: PeriodType,
  previousTotal: number,
): string {
  const reference = getPreviousPeriodReference(period);
  const comparisonPhrase = formatComparisonAccessibilityPhrase(period, total, previousTotal);
  return `${title}, ${formatRupiah(total)} spent, ${comparisonPhrase}, ${reference} ${formatRupiah(previousTotal)}`;
}
