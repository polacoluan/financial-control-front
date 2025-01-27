export const formatCurrency = (value: number | string): string => {
  if (!value) return "R$ 0,00";
  const numericValue = typeof value === "string" ? parseFloat(value) : value;

  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
};