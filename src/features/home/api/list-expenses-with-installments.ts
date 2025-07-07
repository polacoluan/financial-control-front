import { httpGet } from '@/services/api/http';
import { Expense } from '@/features/expense/types/expense';

export async function listExpensesWithInstallments(
  year: number,
  month: number,
): Promise<Expense[]> {
  try {
    const API_URL = `expenses/with-installments/${year}/${month}`;

    const response = await httpGet<Expense[]>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as categorias' + month);
  }
}
