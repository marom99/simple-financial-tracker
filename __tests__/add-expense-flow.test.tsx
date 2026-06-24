import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { AddExpenseSheet } from '../src/features/expenses/AddExpenseSheet';
import { ExpenseStoreProvider } from '../src/features/expenses/ExpenseStoreContext';
import { toDateInputValue } from '../src/utils/dateLabels';
import { renderWithProviders } from './test-utils';

function renderAddExpense(onClose = jest.fn()) {
  return {
    onClose,
    ...renderWithProviders(
      <ExpenseStoreProvider>
        <AddExpenseSheet onClose={onClose} visible />
      </ExpenseStoreProvider>,
    ),
  };
}

describe('AddExpenseSheet', () => {
  it('rejects missing amount and keeps the form open', async () => {
    const { onClose, findByLabelText, findByText } = renderAddExpense();
    fireEvent.changeText(await findByLabelText('Merchant or note'), 'KFC');
    fireEvent.press(await findByText('Save expense'));
    expect(await findByText('Enter an amount to save this expense.')).toBeTruthy();
    expect(onClose).not.toHaveBeenCalled();
  });

  it('rejects non-positive amount', async () => {
    const { findByLabelText, findByText } = renderAddExpense();
    fireEvent.changeText(await findByLabelText('Expense amount'), '0');
    fireEvent.changeText(await findByLabelText('Merchant or note'), 'KFC');
    fireEvent.press(await findByText('Save expense'));
    expect(await findByText('Amount must be greater than zero.')).toBeTruthy();
  });

  it('saves a valid expense and closes', async () => {
    const onClose = jest.fn();
    const { findByLabelText, findByText } = renderAddExpense(onClose);
    fireEvent.changeText(await findByLabelText('Expense amount'), '50000');
    fireEvent.changeText(await findByLabelText('Merchant or note'), 'KFC');
    fireEvent.press(await findByText('Save expense'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalled();
    });
  });

  it('defaults the date to today', async () => {
    const { findByLabelText } = renderAddExpense();
    const dateInput = await findByLabelText('Expense date');
    expect(dateInput.props.value).toBe(toDateInputValue(new Date()));
  });
});
