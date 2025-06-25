import { httpDelete } from '@/services/api/http';
import { MessageResponse } from '@/services/api/types';

export async function deleteType(typeId: string): Promise<MessageResponse> {
  try {
    const API_URL = '/types/' + typeId;

    await httpDelete(API_URL);

    return {
      message: 'Tipo deletado com sucesso.',
    };
  } catch {
    throw new Error('Falha ao deletar Tipo');
  }
}
