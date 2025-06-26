import { isAxiosError } from 'axios';
import { api } from '../../lib/axios';

export async function httpGet<T>(url: string): Promise<T> {
  try {
    const response = await api.get(url);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function httpPost<T>(url: string, data: unknown): Promise<T> {
  try {
    const response = await api.post(url, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function httpPut<T>(url: string, data: unknown): Promise<T> {
  try {
    const response = await api.put(url, data);
    return response.data.data;
  } catch (error) {
    handleError(error);
  }
}

export async function httpPatch<T>(url: string, data: unknown): Promise<T> {
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

function handleError(error: unknown): never {
  if (isAxiosError(error)) {
    const message = error.response?.data?.message;
    throw new Error(message ?? 'Um erro desconhecido ocorreu');
  }
  throw new Error('Um erro desconhecido ocorreu');
}
