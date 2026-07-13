import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PeriodOverviewCard } from '../src/components/PeriodOverviewCard';
import type { PeriodSummary } from '../src/features/expenses/types';
import { formatRupiah } from '../src/utils/currency';

const baseSummary = (period: PeriodSummary['period'], total: number): PeriodSummary => ({
  period,
  total,
  previousTotal: 0,
  comparison: { direction: 'flat', percent: 0 },
  previousPeriodLine:
    period === 'today'
      ? 'Yesterday: Rp0'
      : period === 'week'
        ? 'Last week: Rp0'
        : 'Last month: Rp0',
  expenses: [],
});

describe('PeriodOverviewCard', () => {
  it('exposes breakdown hints on all period controls', () => {
    const { getAllByA11yHint } = render(
      <PeriodOverviewCard
        month={baseSummary('month', 0)}
        onPressPeriod={jest.fn()}
        today={baseSummary('today', 0)}
        week={baseSummary('week', 0)}
      />,
    );

    expect(getAllByA11yHint('Opens spending breakdown')).toHaveLength(3);
  });

  it('renders long totals without losing period labels', () => {
    const largeTotal = 999_999_999;
    const { getByText, getAllByText } = render(
      <PeriodOverviewCard
        month={baseSummary('month', largeTotal)}
        onPressPeriod={jest.fn()}
        today={baseSummary('today', largeTotal)}
        week={baseSummary('week', largeTotal)}
      />,
    );

    expect(getByText('Today')).toBeTruthy();
    expect(getByText('This week')).toBeTruthy();
    expect(getByText('This month')).toBeTruthy();
    expect(getAllByText(formatRupiah(largeTotal)).length).toBeGreaterThanOrEqual(3);
  });

  it('routes presses to the selected period', () => {
    const onPressPeriod = jest.fn();
    const { getByLabelText } = render(
      <PeriodOverviewCard
        month={baseSummary('month', 0)}
        onPressPeriod={onPressPeriod}
        today={baseSummary('today', 0)}
        week={baseSummary('week', 0)}
      />,
    );

    fireEvent.press(getByLabelText('This month, Rp0 spent, same as last month, last month Rp0'));
    expect(onPressPeriod).toHaveBeenCalledWith('month');
  });
});
