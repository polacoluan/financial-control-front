import { httpPut } from '@/services/api/http';
import { IEditObjective } from '../types/objective';

export async function editObjective(
  id: number,
  data: IEditObjective,
): Promise<void> {
  try {
    await httpPut(`/objectives/${id}`, {
      ...data,
    });
  } catch {
    throw new Error('Falha ao editar objetivo');
  }
}
