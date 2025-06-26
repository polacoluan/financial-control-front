import { httpGet } from '@/services/api/http';
import { ExpensesPerTypeResponse } from '../types/home';

export async function listExpensesPerType(
  month: number,
  year: number,
): Promise<ExpensesPerTypeResponse> {
  try {
    const API_URL = `types/top-expenses/${year}/${month}`;

    const response = await httpGet<ExpensesPerTypeResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as despesas por tipo');
  }
}
