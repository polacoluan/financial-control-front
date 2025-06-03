import { httpGet } from "@/services/api/http";

export async function getObjectives(): Promise<any> {
  const API_URL = "/objectives";

  const response = await httpGet(API_URL);

  return response;
}
