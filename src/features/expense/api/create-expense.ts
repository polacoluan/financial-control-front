import { httpPost } from '@/services/api/http';
import { Expense } from '../types/expense';
import { MessageResponse } from '@/services/api/types';

export async function createExpense(data: Expense): Promise<MessageResponse> {
  try {
    const API_URL = '/expenses';

    await httpPost(API_URL, {
      expense: data.expense,
      description: data.description,
      amount: data.amount,
      date: data.date,
      category_id: data.category_id,
      type_id: data.type_id,
      card_id: data.card_id,
      installments: data.installments,
    });

    return {
      message: 'Despesa criada com sucesso.',
    };
  } catch (error) {
    throw new Error('Falha ao realizar criar despesa');
  }
}
