import { httpGet } from '@/services/api/http';
import { Expense } from '../types/expense';

export async function getExpenses(): Promise<Expense[]> {
  const API_URL = `/expenses`;

  const response = await httpGet<Expense[]>(API_URL);

  return response;
}
