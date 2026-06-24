import { formatComparisonPercent, formatExpenseAmount, formatRupiah } from '../src/utils/currency';

describe('formatting utilities', () => {
  it('formats rupiah with Indonesian separators', () => {
    expect(formatRupiah(50000)).toBe('Rp50.000');
    expect(formatRupiah(1250000)).toBe('Rp1.250.000');
  });

  it('formats negative transaction amounts consistently', () => {
    expect(formatExpenseAmount(50000)).toBe('-Rp50.000');
  });

  it('avoids misleading percentage labels when previous total is zero', () => {
    expect(formatComparisonPercent(0, 0)).toBeNull();
    expect(formatComparisonPercent(1000, 0)).toBe('New spending');
    expect(formatComparisonPercent(1000, 0)).not.toMatch(/Infinity/i);
  });

  it('formats valid comparisons when previous total exists', () => {
    expect(formatComparisonPercent(150, 100)).toBe('+50% vs last period');
    expect(formatComparisonPercent(50, 100)).toBe('-50% vs last period');
  });
});
