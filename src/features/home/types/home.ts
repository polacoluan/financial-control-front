export type TopCategory = {
  description: string;
  total_expenses: number;
  percentage: number;
};

export type ExpensesPerTypeItem = {
  id: string;
  description: string;
  total_expenses: number;
  percentage: number;
};

export type ExpensesByTypeItem = {
  expense: string;
  amount: number;
};

export type RecentTransaction = {
  name: string;
  transaction_type: string;
  amount: number;
  date: string;
};

export type TopCategoryResponse = TopCategory[];
export type ExpensesPerTypeResponse = ExpensesPerTypeItem[];
export type ExpensesByTypeResponse = ExpensesByTypeItem[];
export type RecentTransactionResponse = RecentTransaction[];
