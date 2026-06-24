import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Expense } from '../features/expenses/types';

const STORAGE_KEY = '@simple_financial_tracker/expenses';

export interface ExpenseStorage {
  load(): Promise<Expense[]>;
  save(expenses: Expense[]): Promise<void>;
}

export class AsyncStorageExpenseStorage implements ExpenseStorage {
  async load(): Promise<Expense[]> {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as Expense[];
    return Array.isArray(parsed) ? parsed : [];
  }

  async save(expenses: Expense[]): Promise<void> {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  }
}

export function createExpenseStorage(): ExpenseStorage {
  return new AsyncStorageExpenseStorage();
}
