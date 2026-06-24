import { ExpenseStore } from '../src/features/expenses/expenseStore';
import type { ExpenseStorage } from '../src/storage/expenseStorage';
import type { Expense } from '../src/features/expenses/types';

function createMemoryStorage(initial: Expense[] = []): ExpenseStorage & { data: Expense[] } {
  const data = [...initial];
  return {
    data,
    async load() {
      return [...data];
    },
    async save(expenses) {
      data.splice(0, data.length, ...expenses);
    },
  };
}

describe('ExpenseStore', () => {
  it('persists a valid expense and returns it on read', async () => {
    const storage = createMemoryStorage();
    const store = new ExpenseStore();
    await store.hydrate(storage);

    const result = await store.addExpense({
      amount: 50000,
      label: 'KFC',
      category: 'Food',
      date: '2026-06-24',
    });

    expect(result.expense).toBeDefined();
    expect(store.getExpenses()).toHaveLength(1);
    expect(store.getExpenses()[0].label).toBe('KFC');

    const reloaded = new ExpenseStore();
    await reloaded.hydrate(storage);
    expect(reloaded.getExpenses()).toHaveLength(1);
  });

  it.each([
    ['missing amount', { amount: Number.NaN, label: 'KFC', category: 'Food', date: '2026-06-24' }, 'missing_amount'],
    ['zero amount', { amount: 0, label: 'KFC', category: 'Food', date: '2026-06-24' }, 'invalid_amount'],
    ['negative amount', { amount: -10, label: 'KFC', category: 'Food', date: '2026-06-24' }, 'invalid_amount'],
    ['missing label', { amount: 1000, label: '  ', category: 'Food', date: '2026-06-24' }, 'missing_label'],
    ['missing category', { amount: 1000, label: 'KFC', category: ' ', date: '2026-06-24' }, 'missing_category'],
    ['invalid date', { amount: 1000, label: 'KFC', category: 'Food', date: 'not-a-date' }, 'invalid_date'],
  ])('rejects %s', async (_label, input, code) => {
    const store = new ExpenseStore();
    await store.hydrate(createMemoryStorage());
    const result = await store.addExpense(input);
    expect(result.error).toBe(code);
    expect(store.getExpenses()).toHaveLength(0);
  });

  it('surfaces storage failures instead of silently dropping expenses', async () => {
    const failingStorage: ExpenseStorage = {
      load: async () => [],
      save: async () => {
        throw new Error('disk full');
      },
    };
    const store = new ExpenseStore();
    await store.hydrate(failingStorage);

    const result = await store.addExpense({
      amount: 50000,
      label: 'KFC',
      category: 'Food',
      date: '2026-06-24',
    });

    expect(result.storageError).toBe(true);
    expect(store.getError()).toMatch(/Unable to save/);
    expect(store.getExpenses()).toHaveLength(0);
  });
});
