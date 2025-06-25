import { httpPatch } from '@/services/api/http';
import { Category } from '../types/category';
import { MessageResponse } from '@/services/api/types';

export async function editCategory(data: Category): Promise<MessageResponse> {
  try {
    const API_URL = '/categories/' + data.id;

    await httpPatch(API_URL, {
      category: data.category,
      description: data.description,
    });

    return {
      message: 'Categoria criada com sucesso.',
    };
  } catch (error) {
    throw new Error('Falha ao editar Categoria');
  }
}
