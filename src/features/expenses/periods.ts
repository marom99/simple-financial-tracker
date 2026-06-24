import type { PeriodType } from './types';
import { parseLocalDate } from '../../utils/dateLabels';

export const WEEK_STARTS_ON = 1;

export interface DateRange {
  start: Date;
  end: Date;
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function endOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
}

function startOfWeek(date: Date, weekStartsOn = WEEK_STARTS_ON): Date {
  const day = date.getDay();
  const diff = (day - weekStartsOn + 7) % 7;
  const start = startOfDay(date);
  start.setDate(start.getDate() - diff);
  return start;
}

function endOfWeek(date: Date, weekStartsOn = WEEK_STARTS_ON): Date {
  const start = startOfWeek(date, weekStartsOn);
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  return endOfDay(end);
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function endOfMonth(date: Date): Date {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}

export function getPeriodRange(period: PeriodType, referenceDate: Date): DateRange {
  switch (period) {
    case 'today':
      return { start: startOfDay(referenceDate), end: endOfDay(referenceDate) };
    case 'week':
      return { start: startOfWeek(referenceDate), end: endOfWeek(referenceDate) };
    case 'month':
      return { start: startOfMonth(referenceDate), end: endOfMonth(referenceDate) };
  }
}

export function getPreviousPeriodRange(period: PeriodType, referenceDate: Date): DateRange {
  switch (period) {
    case 'today': {
      const previous = new Date(referenceDate);
      previous.setDate(previous.getDate() - 1);
      return { start: startOfDay(previous), end: endOfDay(previous) };
    }
    case 'week': {
      const currentStart = startOfWeek(referenceDate);
      const previousEnd = new Date(currentStart);
      previousEnd.setDate(previousEnd.getDate() - 1);
      const previousStart = startOfWeek(previousEnd);
      return { start: previousStart, end: endOfWeek(previousEnd) };
    }
    case 'month': {
      const previousMonth = new Date(referenceDate.getFullYear(), referenceDate.getMonth() - 1, 1);
      return { start: startOfMonth(previousMonth), end: endOfMonth(previousMonth) };
    }
  }
}

export function isDateInRange(dateString: string, range: DateRange): boolean {
  const date = parseLocalDate(dateString);
  return date >= range.start && date <= range.end;
}
