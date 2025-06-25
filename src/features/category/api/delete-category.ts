import { httpDelete } from '@/services/api/http';
import { MessageResponse } from '@/services/api/types';

export async function deleteCategory(
  categoryId: string,
): Promise<MessageResponse> {
  try {
    const API_URL = '/categories/' + categoryId;

    await httpDelete(API_URL);

    return {
      message: 'Categoria deletada com sucesso.',
    };
  } catch {
    throw new Error('Falha ao deletar Categoria');
  }
}
