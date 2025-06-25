import { httpGet } from "@/services/api/http";
import { TopCategoryResponse } from "../types/home";

export async function listTopCategories(): Promise<TopCategoryResponse> {
  try {
    const API_URL = "categories/top-expenses/6/2025";

    const response = await httpGet<TopCategoryResponse>(API_URL);

    return response;
  } catch (error) {
    throw new Error("Falha ao buscar as categorias");
  }
}
