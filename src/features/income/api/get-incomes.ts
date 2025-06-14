import { httpGet } from "@/services/api/http";

export async function getIncomes(): Promise<any> {
  const API_URL = "/incomes";

  const response = await httpGet(API_URL);

  return response;
}
