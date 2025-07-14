import { httpGet } from '@/services/api/http';
import { Expense } from '@/features/expense/types/expense';

export async function listExpensesWithInstallments(
  start: string,
  end: string,
): Promise<Expense[]> {
  try {
    const API_URL = `expenses/with-installments?start=${start}&end=${end}`;

    const response = await httpGet<Expense[]>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as categorias');
  }
}
