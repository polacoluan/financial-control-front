import { httpGet } from '@/services/api/http';
import { MonthSummary } from '@/types/month-summary';

export async function getMonthSummary(
  start: string,
  end: string,
): Promise<MonthSummary> {
  try {
    const API_URL = `monthly-summary?start=${start}&end=${end}`;

    const response = await httpGet<MonthSummary>(API_URL);
    return response;
  } catch {
    throw new Error('Falha ao buscar o sumário do mês');
  }
}
