import { httpPost } from "@/services/api/http";
import { Objective } from "../types/objective";

export async function createObjective(data: Objective): Promise<any> {
  try {
    const API_URL = "/objectives";

    await httpPost(API_URL, {
      objective: data.objective,
      description: data.description,
      target_value: data.target_value,
      saved_amount: data.saved_amount,
    });

    return {
      message: "Objetivo criado com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao criar objetivo");
  }
}
