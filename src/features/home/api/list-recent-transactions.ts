import { httpGet } from "@/services/api/http";
import { RecentTransactionResponse } from "../types/home";

export async function listRecentTransactions(): Promise<RecentTransactionResponse> {
  try {
    const API_URL = "recent-transactions";

    const response = await httpGet<RecentTransactionResponse>(API_URL);

    return response;
  } catch (error) {
    throw new Error("Falha ao buscar as transações recentes");
  }
}
