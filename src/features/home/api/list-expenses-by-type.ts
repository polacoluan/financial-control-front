import { httpGet } from '@/services/api/http';
import { ExpensesByTypeResponse } from '../types/home';

export async function listExpensesByType(
  start: string,
  end: string,
  typeId: string,
): Promise<ExpensesByTypeResponse> {
  try {
    const API_URL = `types/${typeId}/expenses?start=${start}&end=${end}`;

    const response = await httpGet<ExpensesByTypeResponse>(API_URL);
    return response;
  } catch {
    throw new Error('Falha ao buscar as despesas do tipo');
  }
}
