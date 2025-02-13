// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';
import { Income } from '../types/income';

export async function deleteIncome(incomeId: String): Promise<any> {
    try {
        const API_URL = '/income/'+incomeId;

        await httpDelete(API_URL);

        return {
            message: 'Entrada deletada com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar entrada');
    }
}
