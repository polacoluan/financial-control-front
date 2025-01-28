// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Type } from '../types/type';

export async function editType(data: Type): Promise<any> {
    try {
        const API_URL = '/types/'+data.id;

        await httpPatch(API_URL, {
            type: data.type,
            description: data.description,
        });

        return {
            message: 'Tipo criado com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Tipo');
    }
}
