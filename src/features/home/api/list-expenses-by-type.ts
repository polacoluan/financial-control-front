import { httpGet } from '@/services/api/http';
import { ExpensesByTypeResponse } from '../types/home';

export async function listExpensesByType(
  typeId: string,
  month: number,
  year: number,
): Promise<ExpensesByTypeResponse> {
  try {
    const API_URL = `types/${typeId}/expenses/${year}/${month}`;

    const response = await httpGet<ExpensesByTypeResponse>(API_URL);

    return response;
  } catch (error) {
    throw new Error('Falha ao buscar as despesas do tipo');
  }
}
