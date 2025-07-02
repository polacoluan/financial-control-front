import { httpGet } from '@/services/api/http';
import { TypeResponse } from '../types/type';

export async function getTypes(page = 1): Promise<TypeResponse> {
  try {
    const API_URL = `/types?page=${page}`;

    const response = await httpGet<TypeResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar os tipos');
  }
}
