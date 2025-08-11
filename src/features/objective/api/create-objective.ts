import { httpPost } from '@/services/api/http';
import { ICreateObjective } from '../types/objective';

export async function createObjective({
  ...data
}: ICreateObjective): Promise<void> {
  try {
    await httpPost('/objectives', {
      ...data,
    });
  } catch {
    throw new Error('Falha ao criar objetivo');
  }
}
