import { httpGet } from '@/services/api/http';
import { ObjectiveResponse } from '../types/objective';

export async function getObjectives(): Promise<ObjectiveResponse> {
  const API_URL = '/objectives';

  const response = await httpGet<ObjectiveResponse>(API_URL);

  return response;
}
