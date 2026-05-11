import type { ParsedInput, PaymentMethod, TransactionType } from './types';

const detectPayment = (text: string): PaymentMethod => {
  if (text.includes('qris')) return 'qris';
  if (text.includes('transfer')) return 'transfer';
  if (text.includes('ovo') || text.includes('gopay') || text.includes('dana')) return 'e-wallet';
  return 'cash';
};

export function parseBusinessInput(raw: string): ParsedInput {
  const text = raw.toLowerCase();
  const type: TransactionType = text.includes('utang') || text.includes('tempo')
    ? 'debt'
    : text.includes('beli') || text.includes('bayar') || text.includes('ongkir') || text.includes('gaji')
      ? 'expense'
      : 'income';

  const amountMatch = text.match(/(\d+)\s*(rb|ribu|k|jt|juta)?/i);
  let amount = 0;
  if (amountMatch) {
    amount = Number.parseInt(amountMatch[1], 10);
    const suffix = amountMatch[2];
    if (suffix === 'rb' || suffix === 'ribu' || suffix === 'k') amount *= 1000;
    if (suffix === 'jt' || suffix === 'juta') amount *= 1000000;
  }

  const paymentMethod = detectPayment(text);
  const paid = !(text.includes('belum bayar') || text.includes('tempo') || type === 'debt');

  const cleaned = raw
    .replace(/\d+\s*(rb|ribu|k|jt|juta)?/gi, '')
    .replace(/(jual|beli|bayar|utang|tempo|order|masuk|keluar)/gi, '')
    .trim();

  const category = type === 'income' ? 'Penjualan' : type === 'expense' ? 'Operasional' : 'Piutang';

  return {
    type,
    amount,
    paymentMethod,
    paid,
    category,
    description: cleaned || 'Transaksi baru',
    productName: cleaned.split(' ').slice(0, 2).join(' '),
  };
}

export function generateInsights(input: {
  weekGrowth: number;
  topProduct: string;
  expenseGrowth: number;
  lowStock: string;
  unpaidDebts: number;
}) {
  return [
    `Penjualan naik ${input.weekGrowth}% minggu ini dibanding minggu lalu.`,
    `Produk paling laku saat ini: ${input.topProduct}.`,
    `Pengeluaran operasional ${input.expenseGrowth > 0 ? 'naik' : 'turun'} ${Math.abs(input.expenseGrowth)}%.`,
    `Stok ${input.lowStock} diperkirakan habis dalam 4 hari.`,
    `Ada ${input.unpaidDebts} tagihan belum lunas, prioritas follow-up hari ini.`,
  ];
}

