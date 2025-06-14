import { httpDelete } from "@/services/api/http";

export async function deleteType(typeId: String): Promise<any> {
  try {
    const API_URL = "/types/" + typeId;

    await httpDelete(API_URL);

    return {
      message: "Tipo deletado com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao deletar Tipo");
  }
}
