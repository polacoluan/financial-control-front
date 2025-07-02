import { httpGet } from '@/services/api/http';
import { IncomeResponse } from '../types/income';

export async function getIncomes(page = 1): Promise<IncomeResponse> {
  const API_URL = `/incomes?page=${page}`;

  const response = await httpGet<IncomeResponse>(API_URL);

  return response;
}
