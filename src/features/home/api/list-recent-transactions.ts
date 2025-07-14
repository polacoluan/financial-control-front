import { httpGet } from '@/services/api/http';
import { RecentTransactionResponse } from '../types/home';

export async function listRecentTransactions(
  start: string,
  end: string,
): Promise<RecentTransactionResponse> {
  try {
    const API_URL = `recent-transactions?start=${start}&end=${end}`;

    const response = await httpGet<RecentTransactionResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as transações recentes');
  }
}
