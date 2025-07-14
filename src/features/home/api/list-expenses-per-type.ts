import { httpGet } from '@/services/api/http';
import { Expense } from '@/features/expense/types/expense';

export async function listExpensesPerType(
  start: string,
  end: string,
  type_id: string,
): Promise<Expense[]> {
  try {
    const API_URL = `expenses/by-type/${type_id}?start=${start}&end=${end}`;

    const response = await httpGet<Expense[]>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as despesas por tipo');
  }
}
