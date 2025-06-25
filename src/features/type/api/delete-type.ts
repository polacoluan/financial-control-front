import { httpDelete } from "@/services/api/http";
import { MessageResponse } from "@/services/api/types";

export async function deleteType(typeId: String): Promise<MessageResponse> {
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
