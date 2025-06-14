import { httpGet } from "@/services/api/http";

export async function getExpenses(): Promise<any> {
  const API_URL = "/expenses";

  const response = await httpGet(API_URL);

  return response;
}
