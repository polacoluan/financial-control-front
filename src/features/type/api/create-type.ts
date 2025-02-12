// src/app/actions/signin.tsx
import { httpPost } from '@/services/api/http';
import { Type } from '../types/type';

export async function createType(data: Type): Promise<any> {
    try {
        const API_URL = '/types';

        await httpPost(API_URL, {
            type: data.type,
            description: data.description,
            is_default: data.is_default,
            installments: data.installments,
        });

        return {
            message: 'Tipo criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao criar Tipo');
    }
}