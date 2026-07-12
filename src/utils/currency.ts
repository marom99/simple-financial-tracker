export function formatRupiah(amount: number): string {
  const rounded = Math.round(amount);
  const formatted = Math.abs(rounded).toLocaleString('id-ID');
  return `Rp${formatted}`;
}

export function formatExpenseAmount(amount: number): string {
  return `-${formatRupiah(amount)}`;
}

