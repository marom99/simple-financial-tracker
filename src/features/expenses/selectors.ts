import { formatComparisonPercent } from '../../utils/currency';
import type { Expense, PeriodSummary, PeriodType } from './types';
import { getPeriodRange, getPreviousPeriodRange, isDateInRange } from './periods';

export function filterExpensesInRange(expenses: Expense[], range: { start: Date; end: Date }): Expense[] {
  return expenses.filter((expense) => isDateInRange(expense.date, range));
}

export function sumExpenses(expenses: Expense[]): number {
  return expenses.reduce((total, expense) => total + expense.amount, 0);
}

export function buildPeriodSummary(
  expenses: Expense[],
  period: PeriodType,
  referenceDate: Date = new Date(),
): PeriodSummary {
  const range = getPeriodRange(period, referenceDate);
  const previousRange = getPreviousPeriodRange(period, referenceDate);
  const periodExpenses = filterExpensesInRange(expenses, range);
  const previousExpenses = filterExpensesInRange(expenses, previousRange);
  const total = sumExpenses(periodExpenses);
  const previousTotal = sumExpenses(previousExpenses);

  return {
    period,
    total,
    comparisonLabel: formatComparisonPercent(total, previousTotal),
    expenses: periodExpenses.sort((a, b) => b.date.localeCompare(a.date) || b.createdAt.localeCompare(a.createdAt)),
  };
}

export function buildAllPeriodSummaries(
  expenses: Expense[],
  referenceDate: Date = new Date(),
): PeriodSummary[] {
  const periods: PeriodType[] = ['today', 'week', 'month'];
  return periods.map((period) => buildPeriodSummary(expenses, period, referenceDate));
}
