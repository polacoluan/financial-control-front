import { httpGet } from '@/services/api/http';

export async function getCategories(): Promise<any> {
  try {
    const API_URL = '/categories';

    const response: any = await httpGet(API_URL);

    return response;
  } catch (error) {
    throw new Error('Falha ao buscar as categorias');
  }
}
