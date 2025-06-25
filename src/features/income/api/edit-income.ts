import { httpPatch } from '@/services/api/http';
import { Income } from '../types/income';
import { MessageResponse } from '@/services/api/types';

export async function editIncome(data: Income): Promise<MessageResponse> {
  try {
    const API_URL = '/income/' + data.id;

    await httpPatch(API_URL, {
      income: data.income,
      description: data.description,
      amount: data.amount,
      date: data.date,
    });

    return {
      message: 'Entrada criada com sucesso.',
    };
  } catch {
    throw new Error('Falha ao realizar criar entrada');
  }
}
