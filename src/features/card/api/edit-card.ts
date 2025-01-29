// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Card } from '../types/card';

export async function editCard(data: Card): Promise<any> {
    try {
        const API_URL = '/cards/'+data.id;

        await httpPatch(API_URL, {
            card: data.card,
            description: data.description,
        });

        return {
            message: 'Cartão criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Cartão');
    }
}
