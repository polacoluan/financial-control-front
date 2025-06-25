import { httpGet } from "@/services/api/http";

export async function listTopCategories(): Promise<any> {
  try {
    const API_URL = "categories/top-expenses/6/2025";

    const response: any = await httpGet(API_URL);

    return response;
  } catch (error) {
    throw new Error("Falha ao buscar as categorias");
  }
}
