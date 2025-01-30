// src/app/actions/get-expenses.ts
import { httpGet } from '@/services/api/http';

export async function getExpensesPerMonth(): Promise<any> {

    const API_URL = '/charts/money-spent-per-month/1';

    const response = await httpGet(API_URL);
    
    return response;
}
