export const DEFAULT_CATEGORIES = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Entertainment',
  'Other',
] as const;

export type DefaultCategory = (typeof DEFAULT_CATEGORIES)[number];

export function getCategoryInitial(category: string): string {
  return category.trim().charAt(0).toUpperCase() || '?';
}
