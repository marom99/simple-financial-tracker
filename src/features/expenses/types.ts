export type PeriodType = 'today' | 'week' | 'month';

export interface Expense {
  id: string;
  amount: number;
  label: string;
  category: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpenseInput {
  amount: number;
  label: string;
  category: string;
  date: string;
}

export type ExpenseValidationError =
  | 'missing_amount'
  | 'invalid_amount'
  | 'missing_label'
  | 'missing_category'
  | 'invalid_date';

export type ComparisonDirection = 'up' | 'down' | 'flat';

export interface ComparisonIndicatorData {
  direction: ComparisonDirection;
  percent: number | null;
}

export interface PeriodSummary {
  period: PeriodType;
  total: number;
  previousTotal: number;
  comparison: ComparisonIndicatorData;
  previousPeriodLine: string;
  expenses: Expense[];
}
