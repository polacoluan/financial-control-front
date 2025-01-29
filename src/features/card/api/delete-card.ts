// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteCard(cardId: String): Promise<any> {
    try {
        const API_URL = '/cards/'+cardId;

        await httpDelete(API_URL);

        return {
            message: 'Cartão deletado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Cartão');
    }
}
