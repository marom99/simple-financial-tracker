import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../src/screens/HomeScreen';
import { ExpenseStoreProvider } from '../src/features/expenses/ExpenseStoreContext';
import { renderWithProviders } from './test-utils';

const mockLoad = jest.fn(async () => [] as const);

jest.mock('../src/storage/expenseStorage', () => ({
  createExpenseStorage: () => ({
    load: (...args: unknown[]) => mockLoad(...args),
    save: jest.fn(async () => undefined),
  }),
}));

function renderHome() {
  return renderWithProviders(
    <ExpenseStoreProvider>
      <HomeScreen />
    </ExpenseStoreProvider>,
  );
}

describe('HomeScreen', () => {
  beforeEach(() => {
    mockLoad.mockResolvedValue([]);
  });

  it('renders zero totals without comparison copy when empty', async () => {
    const { findByText, queryByText } = renderHome();
    expect(await findByText('Today')).toBeTruthy();
    expect(queryByText(/vs last period/i)).toBeNull();
  });

  it('opens add expense flow from the floating button', async () => {
    const { findByLabelText, findAllByText } = renderHome();
    fireEvent.press(await findByLabelText('Add expense'));
    const titles = await findAllByText('Add expense');
    expect(titles.length).toBeGreaterThan(0);
  });

  it('opens breakdown sheet when a period row is pressed', async () => {
    const { findByLabelText, findByText } = renderHome();
    fireEvent.press(await findByLabelText(/Today,/));
    expect(await findByText('No expenses yet')).toBeTruthy();
  });

  it('shows formatted totals for seeded expenses', async () => {
    mockLoad.mockResolvedValue([
      {
        id: '1',
        amount: 50000,
        label: 'KFC',
        category: 'Food',
        date: new Date().toISOString().slice(0, 10),
        createdAt: '2026-06-24T00:00:00.000Z',
        updatedAt: '2026-06-24T00:00:00.000Z',
      },
    ]);

    const { findAllByText } = renderHome();
    const totals = await findAllByText('Rp50.000', {}, { timeout: 3000 });
    expect(totals.length).toBeGreaterThan(0);
  });
});
