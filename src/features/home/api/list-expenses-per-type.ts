import { httpGet } from "@/services/api/http";

export async function listExpensesPerType(
  month: number,
  year: number
): Promise<any> {
  try {
    const API_URL = `types/top-expenses/${year}/${month}`;

    const response: any = await httpGet(API_URL);

    return response;
  } catch (error) {
    throw new Error("Falha ao buscar as despesas por tipo");
  }
}
