import { httpGet } from '@/services/api/http';
import { ExpenseResponse } from '../types/expense';

export async function getExpenses(): Promise<ExpenseResponse> {
  const API_URL = '/expenses';

  const response = await httpGet<ExpenseResponse>(API_URL);

  return response;
}
