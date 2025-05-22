// src/app/actions/get-expenses.ts
import { httpGet } from "@/services/api/http";

export async function getExpensesPerMonth(
  year: number,
  month: number
): Promise<any> {
  const API_URL = `/charts/money-spent-per-month/${year}/${month}`;

  const response = await httpGet(API_URL);

  return response;
}
