import { httpGet } from '@/services/api/http';
import { TopCategoryResponse } from '../types/home';

export async function listTopCategories(
  limit: number,
  month: number,
  year: number,
): Promise<TopCategoryResponse> {
  try {
    const API_URL = `categories/top-expenses/${limit}/${year}/${month}`;

    const response = await httpGet<TopCategoryResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as categorias');
  }
}
