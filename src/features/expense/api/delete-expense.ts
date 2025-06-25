import { httpDelete } from '@/services/api/http';
import { Expense } from '../types/expense';
import { MessageResponse } from '@/services/api/types';

export async function deleteExpense(
  expenseId: String,
): Promise<MessageResponse> {
  try {
    const API_URL = '/expenses/' + expenseId;

    await httpDelete(API_URL);

    return {
      message: 'Despesa deletada com sucesso.',
    };
  } catch (error) {
    throw new Error('Falha ao deletar despesa');
  }
}
