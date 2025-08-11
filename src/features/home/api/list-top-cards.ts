import { httpGet } from '@/services/api/http';
import { TopCardResponse } from '../types/home';

export async function listTopCards(
  start: string,
  end: string,
): Promise<TopCardResponse> {
  try {
    const API_URL = `cards/top/expenses?start=${start}&end=${end}`;

    const response = await httpGet<TopCardResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as categorias');
  }
}
