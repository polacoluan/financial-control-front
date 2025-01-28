// src/app/actions/signin.tsx
import { httpPatch } from '@/services/api/http';
import { Category } from '../types/category';

export async function editCategory(data: Category): Promise<any> {
    try {
        const API_URL = '/categories/'+data.id;

        await httpPatch(API_URL, {
            expense: data.category,
            description: data.description,
        });

        return {
            message: 'Categoria criada com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao editar Categoria');
    }
}
