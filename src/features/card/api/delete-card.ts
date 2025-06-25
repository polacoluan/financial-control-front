import { httpDelete } from '@/services/api/http';
import { MessageResponse } from '@/services/api/types';

export async function deleteCard(cardId: string): Promise<MessageResponse> {
  try {
    const API_URL = '/cards/' + cardId;

    await httpDelete(API_URL);

    return {
      message: 'Cartão deletado com sucesso.',
    };
  } catch {
    throw new Error('Falha ao deletar Cartão');
  }
}
