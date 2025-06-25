import { httpGet } from "@/services/api/http";

export async function listTopCategories(
  limit: number,
  month: number,
  year: number,
): Promise<any> {
  try {
    const API_URL = `categories/top-expenses/${limit}/${year}/${month}`;

    const response: any = await httpGet(API_URL);

    return response;
  } catch (error) {
    throw new Error("Falha ao buscar as categorias");
  }
}
