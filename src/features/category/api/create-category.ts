import { httpPost } from '@/services/api/http';
import { Category } from '../types/category';
import { MessageResponse } from '@/services/api/types';

export async function createCategory(data: Category): Promise<MessageResponse> {
  try {
    const API_URL = '/categories';

    await httpPost(API_URL, {
      category: data.category,
      description: data.description,
    });

    return {
      message: 'Categoria criada com sucesso.',
    };
  } catch {
    throw new Error('Falha ao criar Categoria');
  }
}
