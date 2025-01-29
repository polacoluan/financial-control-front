// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Card } from '../types/card';

export async function createCard(data: Card): Promise<any> {
    try {
        const API_URL = '/cards';

        await httpPost(API_URL, {
            card: data.card,
            description: data.description
        });

        return {
            message: 'Cartão criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Cartão');
    }
}