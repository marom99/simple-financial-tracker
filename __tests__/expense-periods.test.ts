import type { Expense } from '../src/features/expenses/types';
import { getPeriodRange, getPreviousPeriodRange, isDateInRange } from '../src/features/expenses/periods';
import { buildPeriodSummary } from '../src/features/expenses/selectors';

const referenceDate = new Date(2026, 5, 24, 12, 0, 0);

function expense(date: string, amount: number): Expense {
  return {
    id: `${date}-${amount}`,
    amount,
    label: 'Test',
    category: 'Food',
    date,
    createdAt: `${date}T00:00:00.000Z`,
    updatedAt: `${date}T00:00:00.000Z`,
  };
}

describe('period calculations', () => {
  it('includes today expense in today, week, and month totals', () => {
    const expenses = [expense('2026-06-24', 50000)];
    expect(buildPeriodSummary(expenses, 'today', referenceDate).total).toBe(50000);
    expect(buildPeriodSummary(expenses, 'week', referenceDate).total).toBe(50000);
    expect(buildPeriodSummary(expenses, 'month', referenceDate).total).toBe(50000);
  });

  it('includes yesterday in week and month but not today', () => {
    const expenses = [expense('2026-06-23', 20000)];
    expect(buildPeriodSummary(expenses, 'today', referenceDate).total).toBe(0);
    expect(buildPeriodSummary(expenses, 'week', referenceDate).total).toBe(20000);
    expect(buildPeriodSummary(expenses, 'month', referenceDate).total).toBe(20000);
  });

  it('excludes last month from this month and uses it for previous month comparison', () => {
    const expenses = [expense('2026-05-30', 10000)];
    const monthSummary = buildPeriodSummary(expenses, 'month', referenceDate);
    expect(monthSummary.total).toBe(0);

    const previousRange = getPreviousPeriodRange('month', referenceDate);
    expect(isDateInRange('2026-05-30', previousRange)).toBe(true);
  });

  it('uses monday as the deterministic week start', () => {
    const weekRange = getPeriodRange('week', referenceDate);
    expect(weekRange.start.getDay()).toBe(1);
    expect(weekRange.start.getDate()).toBe(22);
    expect(weekRange.start.getMonth()).toBe(5);
  });

  it('returns zero totals and empty lists for empty periods', () => {
    const summary = buildPeriodSummary([], 'today', referenceDate);
    expect(summary.total).toBe(0);
    expect(summary.expenses).toEqual([]);
    expect(summary.comparisonLabel).toBeNull();
  });

  it('avoids misleading percentage output when previous total is zero', () => {
    const summary = buildPeriodSummary([expense('2026-06-24', 50000)], 'today', referenceDate);
    expect(summary.comparisonLabel).toBe('New spending');
    expect(summary.comparisonLabel).not.toMatch(/Infinity/i);
  });
});
