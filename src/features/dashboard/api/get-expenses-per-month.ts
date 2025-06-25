import { httpGet } from "@/services/api/http";
import { DashboardResponse } from "../types/dashboard";

export async function getExpensesPerMonth(
  year: number,
  month: number
): Promise<DashboardResponse> {
  const API_URL = `/charts/money-spent-per-month/${year}/${month}`;

  const response = await httpGet<DashboardResponse>(API_URL);

  return response;
}
