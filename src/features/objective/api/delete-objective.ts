import { httpDelete } from '@/services/api/http';

export async function deleteObjective(objectiveId: number): Promise<void> {
  try {
    await httpDelete(`/objectives/${objectiveId}`);
  } catch {
    throw new Error('Falha ao deletar objetivo');
  }
}
