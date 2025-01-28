// src/app/actions/signin.tsx
import { httpDelete } from '@/services/api/http';

export async function deleteCategory(categoryId: String): Promise<any> {
    try {
        const API_URL = '/categories/'+categoryId;

        await httpDelete(API_URL);

        return {
            message: 'Categoria deletada com sucesso.'
        }
    } catch (error) {
        throw new Error('Falha ao deletar Categoria');
    }
}
