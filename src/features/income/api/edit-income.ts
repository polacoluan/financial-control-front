import { httpPatch } from "@/services/api/http";
import { Income } from "../types/income";

export async function editIncome(data: Income): Promise<any> {
  try {
    const API_URL = "/income/" + data.id;

    await httpPatch(API_URL, {
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
