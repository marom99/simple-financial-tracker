import type { ExpenseStorage } from '../../storage/expenseStorage';
import { parseLocalDate, toDateInputValue } from '../../utils/dateLabels';
import type { Expense, ExpenseInput, ExpenseValidationError } from './types';

type Listener = () => void;

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function validateExpenseInput(input: ExpenseInput): ExpenseValidationError | null {
  if (input.amount === undefined || input.amount === null || Number.isNaN(input.amount)) {
    return 'missing_amount';
  }
  if (input.amount <= 0) {
    return 'invalid_amount';
  }
  if (!input.label?.trim()) {
    return 'missing_label';
  }
  if (!input.category?.trim()) {
    return 'missing_category';
  }
  if (!input.date || Number.isNaN(parseLocalDate(input.date).getTime())) {
    return 'invalid_date';
  }
  return null;
}

export class ExpenseStore {
  private expenses: Expense[] = [];
  private listeners = new Set<Listener>();
  private storage: ExpenseStorage | null = null;
  private error: string | null = null;
  private hydrated = false;

  async hydrate(storage: ExpenseStorage): Promise<void> {
    this.storage = storage;
    try {
      this.expenses = await storage.load();
      this.error = null;
      this.hydrated = true;
      this.notify();
    } catch {
      this.error = 'Unable to load saved expenses.';
      this.hydrated = true;
      this.notify();
    }
  }

  isHydrated(): boolean {
    return this.hydrated;
  }

  getError(): string | null {
    return this.error;
  }

  getExpenses(): Expense[] {
    return [...this.expenses];
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  async addExpense(
    input: ExpenseInput,
  ): Promise<{ expense?: Expense; error?: ExpenseValidationError; storageError?: boolean }> {
    const validationError = validateExpenseInput(input);
    if (validationError) {
      return { error: validationError };
    }

    const now = new Date().toISOString();
    const expense: Expense = {
      id: generateId(),
      amount: input.amount,
      label: input.label.trim(),
      category: input.category.trim(),
      date: input.date,
      createdAt: now,
      updatedAt: now,
    };

    const nextExpenses = [expense, ...this.expenses];

    if (!this.storage) {
      this.expenses = nextExpenses;
      this.notify();
      return { expense };
    }

    try {
      await this.storage.save(nextExpenses);
      this.expenses = nextExpenses;
      this.error = null;
      this.notify();
      return { expense };
    } catch {
      this.error = 'Unable to save expense. Please try again.';
      this.notify();
      return { storageError: true };
    }
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }
}

export function createDefaultExpenseInput(referenceDate: Date = new Date()): ExpenseInput {
  return {
    amount: 0,
    label: '',
    category: 'Food',
    date: toDateInputValue(referenceDate),
  };
}
