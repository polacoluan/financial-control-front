import { httpGet } from '@/services/api/http';
import { IncomeResponse } from '../types/income';

export async function getIncomes(): Promise<IncomeResponse> {
  const API_URL = '/incomes';

  const response = await httpGet<IncomeResponse>(API_URL);

  return response;
}
