import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { ExpenseStore } from './expenseStore';
import { createExpenseStorage } from '../../storage/expenseStorage';
import type { Expense } from './types';

const ExpenseStoreContext = createContext<ExpenseStore | null>(null);

export function ExpenseStoreProvider({ children }: { children: React.ReactNode }) {
  const store = useMemo(() => new ExpenseStore(), []);

  useEffect(() => {
    void store.hydrate(createExpenseStorage());
  }, [store]);

  return <ExpenseStoreContext.Provider value={store}>{children}</ExpenseStoreContext.Provider>;
}

export function useExpenseStore(): ExpenseStore {
  const store = useContext(ExpenseStoreContext);
  if (!store) {
    throw new Error('useExpenseStore must be used within ExpenseStoreProvider');
  }
  return store;
}

export function useExpenses(): Expense[] {
  const store = useExpenseStore();
  const [expenses, setExpenses] = useState<Expense[]>(() => store.getExpenses());

  useEffect(
    () =>
      store.subscribe(() => {
        setExpenses(store.getExpenses());
      }),
    [store],
  );

  return expenses;
}
