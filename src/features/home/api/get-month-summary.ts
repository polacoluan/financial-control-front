import { httpGet } from '@/services/api/http';
import { MonthSummary } from '@/types/month-summary';

export async function getMonthSummary(
  year: number,
  month: number,
): Promise<MonthSummary> {
  try {
    const API_URL = `monthly-summary/${year}/${month}`;

    const response = await httpGet<MonthSummary>(API_URL);
    return response;
  } catch {
    throw new Error('Falha ao buscar o sumário do mês');
  }
}
