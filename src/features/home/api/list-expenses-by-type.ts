import { httpGet } from '@/services/api/http';
import { ExpensesByTypeResponse } from '../types/home';

export async function listExpensesByType(
  month: number,
  year: number,
  typeId: string,
): Promise<ExpensesByTypeResponse> {
  try {
    const API_URL = `types/${typeId}/expenses/${year}/${month}`;

    const response = await httpGet<ExpensesByTypeResponse>(API_URL);
    console.log(response);
    return response;
  } catch {
    throw new Error('Falha ao buscar as despesas do tipo');
  }
}
