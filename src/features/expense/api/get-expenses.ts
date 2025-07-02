import { httpGet } from '@/services/api/http';
import { ExpenseResponse } from '../types/expense';

export async function getExpenses(page = 1): Promise<ExpenseResponse> {
  const API_URL = `/expenses?page=${page}`;

  const response = await httpGet<ExpenseResponse>(API_URL);

  return response;
}
