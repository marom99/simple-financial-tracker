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

export interface PeriodSummary {
  period: PeriodType;
  total: number;
  comparisonLabel: string | null;
  expenses: Expense[];
}
