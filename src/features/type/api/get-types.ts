import { httpGet } from '@/services/api/http';
import { TypeResponse } from '../types/type';

export async function getTypes(): Promise<TypeResponse> {
  try {
    const API_URL = '/types';

    const response = await httpGet<TypeResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar os tipos');
  }
}
