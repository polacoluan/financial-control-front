// src/app/actions/http.ts
import { api } from '../../lib/axios';

export async function httpGet<T>(url: string): Promise<T> {
  try {
    const response = await api.get(url);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function httpPost<T>(url: string, data: any): Promise<T> {
  try {
    const response = await api.post(url, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function httpPut<T>(url: string, data: any): Promise<T> {
  try {
    const response = await api.put(url, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function httpPatch<T>(url: string, data: any): Promise<T> {
  try {
    const response = await api.patch(url, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function httpDelete<T>(url: string): Promise<T> {
  try {
    const response = await api.delete(url);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

function handleError(error: any): never {
  console.error('Erro da API:', error);
  throw new Error(error.response?.data?.message || 'Um erro desconhecido ocorreu');
}