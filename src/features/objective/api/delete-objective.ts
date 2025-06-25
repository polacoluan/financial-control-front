import { httpDelete } from '@/services/api/http';
import { MessageResponse } from '@/services/api/types';

export async function deleteObjective(
  objectiveId: string,
): Promise<MessageResponse> {
  try {
    const API_URL = '/objectives/' + objectiveId;

    await httpDelete(API_URL);

    return {
      message: 'Objetivo deletado com sucesso.',
    };
  } catch {
    throw new Error('Falha ao deletar objetivo');
  }
}
