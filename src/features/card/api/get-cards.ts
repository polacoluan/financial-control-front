import { httpGet } from '@/services/api/http';

export async function getCards(): Promise<any> {
    try {
        const API_URL = '/cards';

        const response: any = await httpGet(API_URL);

        return response;
    } catch (error) {
        throw new Error('Falha ao buscar os cartões');
    }
}