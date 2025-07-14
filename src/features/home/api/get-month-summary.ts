import { httpGet } from '@/services/api/http';
import { MonthSummary } from '@/types/month-summary';

export async function getMonthSummary(
  expenseStart: string,
  expenseEnd: string,
  incomeStart: string,
  incomeEnd: string,
): Promise<MonthSummary> {
  try {
    const API_URL = `monthly-summary?expense_start=${expenseStart}&expense_end=${expenseEnd}&income_start=${incomeStart}&income_end=${incomeEnd}`;

    const response = await httpGet<MonthSummary>(API_URL);
    return response;
  } catch {
    throw new Error('Falha ao buscar o sumário do mês');
  }
}
