import { httpPatch } from '@/services/api/http';
import { Type } from '../types/type';
import { MessageResponse } from '@/services/api/types';

export async function editType(data: Type): Promise<MessageResponse> {
  try {
    const API_URL = '/types/' + data.id;

    await httpPatch(API_URL, {
      type: data.type,
      description: data.description,
      is_default: data.is_default,
      installments: data.installments,
    });

    return {
      message: 'Tipo criado com sucesso.',
    };
  } catch (error) {
    throw new Error('Falha ao editar Tipo');
  }
}
