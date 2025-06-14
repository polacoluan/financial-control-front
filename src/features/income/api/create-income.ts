import { httpPost } from "@/services/api/http";
import { Income } from "../types/income";

export async function createIncome(data: Income): Promise<any> {
  try {
    const API_URL = "/income";

    await httpPost(API_URL, {
      income: data.income,
      description: data.description,
      amount: data.amount,
      date: data.date,
    });

    return {
      message: "Entrada criada com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao realizar criar entrada");
  }
}
