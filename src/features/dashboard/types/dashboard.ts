export interface DashboardSummary {
  total_expenses: number;
  total_incomes: number;
  cards: { card: string; amount: number }[];
  types: { type: string; amount: number }[];
  categories: { category: string; amount: number }[];
  dates: { date: string; amount: number }[];
}

export type DashboardResponse = DashboardSummary;
