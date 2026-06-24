import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { ExpenseBreakdownSheet } from '../src/features/expenses/ExpenseBreakdownSheet';
import type { PeriodSummary } from '../src/features/expenses/types';
import { renderWithProviders } from './test-utils';

const todaySummary: PeriodSummary = {
  period: 'today',
  total: 50000,
  comparisonLabel: 'New spending',
  expenses: [
    {
      id: '1',
      amount: 50000,
      label: 'KFC',
      category: 'Food',
      date: '2026-06-24',
      createdAt: '2026-06-24T00:00:00.000Z',
      updatedAt: '2026-06-24T00:00:00.000Z',
    },
  ],
};

const emptyWeekSummary: PeriodSummary = {
  period: 'week',
  total: 0,
  comparisonLabel: null,
  expenses: [],
};

describe('ExpenseBreakdownSheet', () => {
  it('shows today title and only today expenses', async () => {
    const { findByText } = renderWithProviders(
      <ExpenseBreakdownSheet
        onAddExpense={jest.fn()}
        onDismiss={jest.fn()}
        summary={todaySummary}
        visible
      />,
    );

    expect(await findByText('Today')).toBeTruthy();
    expect(await findByText('KFC')).toBeTruthy();
    expect(await findByText('-Rp50.000')).toBeTruthy();
  });

  it('renders empty state with add expense action', async () => {
    const onAddExpense = jest.fn();
    const { findByText } = renderWithProviders(
      <ExpenseBreakdownSheet
        onAddExpense={onAddExpense}
        onDismiss={jest.fn()}
        summary={emptyWeekSummary}
        visible
      />,
    );

    fireEvent.press(await findByText('Add expense'));
    expect(onAddExpense).toHaveBeenCalled();
  });
});
