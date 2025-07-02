import { httpGet } from '@/services/api/http';
import { ObjectiveResponse } from '../types/objective';

export async function getObjectives(page = 1): Promise<ObjectiveResponse> {
  const API_URL = `/objectives?page=${page}`;

  const response = await httpGet<ObjectiveResponse>(API_URL);

  return response;
}
