import {
  buildComparisonIndicator,
  formatComparisonAccessibilityPhrase,
  formatPreviousPeriodLine,
  formatSpendingCardAccessibilityLabel,
} from '../src/features/expenses/comparison';
import { formatExpenseAmount, formatRupiah } from '../src/utils/currency';

describe('formatting utilities', () => {
  it('formats rupiah with Indonesian separators', () => {
    expect(formatRupiah(50000)).toBe('Rp50.000');
    expect(formatRupiah(1250000)).toBe('Rp1.250.000');
  });

  it('formats negative transaction amounts consistently', () => {
    expect(formatExpenseAmount(50000)).toBe('-Rp50.000');
  });

  it('builds compact comparison indicators', () => {
    expect(buildComparisonIndicator(0, 0)).toEqual({ direction: 'flat', percent: 0 });
    expect(buildComparisonIndicator(1000, 0)).toEqual({ direction: 'up', percent: null });
    expect(buildComparisonIndicator(150, 100)).toEqual({ direction: 'up', percent: 50 });
    expect(buildComparisonIndicator(50, 100)).toEqual({ direction: 'down', percent: 50 });
    expect(buildComparisonIndicator(100, 100)).toEqual({ direction: 'flat', percent: 0 });
  });

  it('formats previous period lines', () => {
    expect(formatPreviousPeriodLine('today', 50000)).toBe('Yesterday: Rp50.000');
    expect(formatPreviousPeriodLine('week', 0)).toBe('Last week: Rp0');
    expect(formatPreviousPeriodLine('month', 120000)).toBe('Last month: Rp120.000');
  });

  it('formats accessibility phrases and card labels', () => {
    expect(formatComparisonAccessibilityPhrase('today', 60000, 50000)).toBe(
      '20% higher than yesterday',
    );
    expect(formatComparisonAccessibilityPhrase('week', 0, 20000)).toBe('100% lower than last week');
    expect(formatComparisonAccessibilityPhrase('today', 50000, 0)).toBe('higher than yesterday');

    expect(
      formatSpendingCardAccessibilityLabel('Today', 60000, 'today', 50000),
    ).toBe('Today, Rp60.000 spent, 20% higher than yesterday, yesterday Rp50.000');
  });
});
