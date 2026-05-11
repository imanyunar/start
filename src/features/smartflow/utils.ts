export const formatMoney = (value: number) => {
  if (value >= 1000000) {
    return `Rp ${(value / 1000000).toFixed(1)} juta`;
  }
  if (value >= 1000) {
    return `Rp ${(value / 1000).toFixed(0)} ribu`;
  }
  return `Rp ${value}`;
};

export const formatMoneyFull = (value: number) => `Rp ${value.toLocaleString('id-ID')}`;

export const isToday = (date: Date) => {
  const now = new Date();
  return date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
};

export const monthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;

export const shortDate = (date: Date) => date.toLocaleString('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });

