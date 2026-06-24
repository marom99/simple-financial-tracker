export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = Math.abs(rounded).toLocaleString('id-ID');
  return `Rp${formatted}`;
}

export function formatExpenseAmount(amount: number): string {
  return `-${formatRupiah(amount)}`;
}

export function formatComparisonPercent(current: number, previous: number): string | null {
  if (previous === 0) {
    if (current === 0) {
      return null;
    }
    return 'New spending';
  }

  const change = ((current - previous) / previous) * 100;
  const rounded = Math.round(change);
  const sign = rounded > 0 ? '+' : '';
  return `${sign}${rounded}% vs last period`;
}
