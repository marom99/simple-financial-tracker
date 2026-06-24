const PERIOD_TITLES: Record<string, string> = {
  today: 'Today',
  week: 'This Week',
  month: 'This Month',
};

export function getPeriodTitle(period: string): string {
  return PERIOD_TITLES[period] ?? period;
}

export function getGreeting(referenceDate: Date = new Date()): string {
  const hour = referenceDate.getHours();
  if (hour < 12) {
    return 'Good morning';
  }
  if (hour < 17) {
    return 'Good afternoon';
  }
  return 'Good evening';
}

export function toDateInputValue(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}
