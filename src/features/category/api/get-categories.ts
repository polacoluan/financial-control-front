import { httpGet } from '@/services/api/http';
import { CategoryResponse } from '../types/category';

export async function getCategories(page = 1): Promise<CategoryResponse> {
  try {
    const API_URL = `/categories?page=${page}`;

    const response = await httpGet<CategoryResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar as categorias');
  }
}
