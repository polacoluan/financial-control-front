export const formatCurrency = (value: number | string): string => {
  if (!value) return 'R$ 0,00';
  const numericValue = typeof value === 'string' ? parseFloat(value) : value;

  const moneyFormatter = Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    currencyDisplay: 'symbol',
    currencySign: 'standard',
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return moneyFormatter.format(numericValue);
};
