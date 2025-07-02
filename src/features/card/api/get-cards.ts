import { httpGet } from '@/services/api/http';
import { CardResponse } from '../types/card';

export async function getCards(page = 1): Promise<CardResponse> {
  try {
    const API_URL = `/cards?page=${page}`;

    const response = await httpGet<CardResponse>(API_URL);

    return response;
  } catch {
    throw new Error('Falha ao buscar os cartões');
  }
}
