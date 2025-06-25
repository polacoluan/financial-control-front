import { httpDelete } from "@/services/api/http";
import { Objective } from "../types/objective";
import { MessageResponse } from "@/services/api/types";

export async function deleteObjective(objectiveId: String): Promise<MessageResponse> {
  try {
    const API_URL = "/objectives/" + objectiveId;

    await httpDelete(API_URL);

    return {
      message: "Objetivo deletado com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao deletar objetivo");
  }
}
