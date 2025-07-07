export type Expense = {
  id: string;
  expense: string;
  description: string;
  amount: number;
  date: string;
  category_id: string;
  type_id: string;
  card_id: string;
  installments: number;
  category: string;
  type: string;
  installments_quantity: number;
  paid: number;
  to_pay: number;
  total: number;
};

export type ExpenseResponse = Expense[];
