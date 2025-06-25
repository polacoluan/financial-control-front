import { httpPost } from "@/services/api/http";
import { Card } from "../types/card";
import { MessageResponse } from "@/services/api/types";

export async function createCard(data: Card): Promise<MessageResponse> {
  try {
    const API_URL = "/cards";

    await httpPost(API_URL, {
      card: data.card,
      description: data.description,
      is_default: data.is_default,
    });

    return {
      message: "Cartão criado com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao criar Cartão");
  }
}
