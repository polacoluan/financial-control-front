import { httpGet } from '@/services/api/http';
import { TopCategoryResponse } from '../types/home';

export async function listTopCategories(
  start: string,
  end: string,
): Promise<TopCategoryResponse> {
  try {
    const API_URL = `categories/top-expenses?start=${start}&end=${end}`;

    const response = await httpGet<TopCategoryResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as categorias');
  }
}
