import { httpGet } from '@/services/api/http';
import { CategoryResponse } from '../types/category';

export async function getCategories(): Promise<CategoryResponse> {
  try {
    const API_URL = '/categories';

    const response = await httpGet<CategoryResponse>(API_URL);

    return response;
  } catch (error) {
    throw new Error('Falha ao buscar as categorias');
  }
}
