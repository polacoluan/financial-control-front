import { httpDelete } from '@/services/api/http';
import { MessageResponse } from '@/services/api/types';

export async function deleteCard(cardId: String): Promise<MessageResponse> {
  try {
    const API_URL = '/cards/' + cardId;

    await httpDelete(API_URL);

    return {
      message: 'Cartão deletado com sucesso.',
    };
  } catch (error) {
    throw new Error('Falha ao deletar Cartão');
  }
}
