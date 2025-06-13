// src/app/actions/signin.tsx
import { httpDelete } from "@/services/api/http";
import { Expense } from "../types/expense";

export async function deleteExpense(exepenseId: String): Promise<any> {
  try {
    const API_URL = "/expenses/" + exepenseId;

    await httpDelete(API_URL);

    return {
      message: "Despesa deletada com sucesso.",
    };
  } catch (error) {
    throw new Error("Falha ao deletar despesa");
  }
}
