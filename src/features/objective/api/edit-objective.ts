import { httpPut } from "@/services/api/http";
import { Objective } from "../types/objective";
import { MessageResponse } from "@/services/api/types";

export async function editObjective(data: Objective): Promise<MessageResponse> {
  try {
    const API_URL = "/objectives/" + data.id;

    await httpPut(API_URL, {
      objective: data.objective,
      description: data.description,
      target_value: data.target_value,
      saved_amount: data.saved_amount,
    });

    return {
      message: "Objetivo editado com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao editar objetivo");
  }
}
