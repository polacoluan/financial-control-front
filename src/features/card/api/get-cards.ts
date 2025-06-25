import { httpGet } from '@/services/api/http';
import { CardResponse } from '../types/card';

export async function getCards(): Promise<CardResponse> {
  try {
    const API_URL = '/cards';

    const response = await httpGet<CardResponse>(API_URL);

    return response;
  } catch (error) {
    throw new Error('Falha ao buscar os cartões');
  }
}
