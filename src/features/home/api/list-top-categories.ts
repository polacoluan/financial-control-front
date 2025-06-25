import { httpGet } from "@/services/api/http";
import { TopCategoryResponse } from "../types/home";

<<<<<<< codex/definir-tipos-de-resposta-para-api
export async function listTopCategories(): Promise<TopCategoryResponse> {
=======
export async function listTopCategories(
  limit: number,
  month: number,
  year: number,
): Promise<any> {
>>>>>>> main
  try {
    const API_URL = `categories/top-expenses/${limit}/${year}/${month}`;

    const response = await httpGet<TopCategoryResponse>(API_URL);

    return response;
  } catch (error) {
    throw new Error("Falha ao buscar as categorias");
  }
}
