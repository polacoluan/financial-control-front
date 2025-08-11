import { httpGet } from '@/services/api/http';
import { TopTypeResponse } from '../types/home';

export async function listTopTypes(
  start: string,
  end: string,
): Promise<TopTypeResponse> {
  try {
    const API_URL = `types/top/expenses?start=${start}&end=${end}`;

    const response = await httpGet<TopTypeResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as categorias');
  }
}
