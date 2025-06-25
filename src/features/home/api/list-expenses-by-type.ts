import { httpGet } from "@/services/api/http";

export async function listExpensesByType(
  typeId: string,
  month: number,
  year: number,
): Promise<any> {
  try {
    const API_URL = `types/${typeId}/expenses/${month}/${year}`;

    const response: any = await httpGet(API_URL);

    return response;
  } catch (error) {
    throw new Error("Falha ao buscar as despesas do tipo");
  }
}
