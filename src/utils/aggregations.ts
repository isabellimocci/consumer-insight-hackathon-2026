import type { Transaction, CategoryTotal } from '../types';

export function getTotalByCategory(
  transactions: Transaction[],
): CategoryTotal[] {
  const map = new Map<string, CategoryTotal>();

  for (const tx of transactions) {
    const entry = map.get(tx.category);
    if (entry) {
      entry.total += tx.amount;
      entry.count += 1;
    } else {
      map.set(tx.category, {
        category: tx.category,
        total: tx.amount,
        count: 1,
      });
    }
  }

  return Array.from(map.values()).sort((a, b) => b.total - a.total);
}
