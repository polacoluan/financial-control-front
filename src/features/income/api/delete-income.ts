import { httpDelete } from '@/services/api/http';
import { MessageResponse } from '@/services/api/types';

export async function deleteIncome(incomeId: string): Promise<MessageResponse> {
  try {
    const API_URL = '/income/' + incomeId;

    await httpDelete(API_URL);

    return {
      message: 'Entrada deletada com sucesso.',
    };
  } catch {
    throw new Error('Falha ao deletar entrada');
  }
}
