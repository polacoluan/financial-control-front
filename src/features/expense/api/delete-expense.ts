// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';
import { Expense } from '../types/expense';

export async function deleteExpense(exepnseId: String): Promise<any> {
    try {
        const API_URL = '/expenses/'+exepnseId;

        await httpDelete(API_URL);

        return {
            message: 'Despesa deletada com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar despesa');
    }
}
