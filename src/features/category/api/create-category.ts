import { httpPost } from "@/services/api/http";
import { Category } from "../types/category";

export async function createCategory(data: Category): Promise<any> {
  try {
    const API_URL = "/categories";

    await httpPost(API_URL, {
      category: data.category,
      description: data.description,
    });

    return {
      message: "Categoria criada com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao criar Categoria");
  }
}
