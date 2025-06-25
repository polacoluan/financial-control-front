import { httpGet } from "@/services/api/http";

export async function listRecentTransactions(): Promise<any> {
  try {
    const API_URL = "recent-transactions";

    const response: any = await httpGet(API_URL);

    return response;
  } catch (error) {
    throw new Error("Falha ao buscar as transações recentes");
  }
}
