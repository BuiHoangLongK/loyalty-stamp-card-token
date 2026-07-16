import axios, { type AxiosInstance } from 'axios';

const isBrowser = typeof window !== 'undefined';

export const api: AxiosInstance = axios.create({
  baseURL: isBrowser ? '' : (process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'),
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export type Envelope<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string; details?: unknown } };

export async function apiGet<T>(url: string, params?: Record<string, unknown>): Promise<T> {
  const res = await api.get<Envelope<T>>(url, { params });
  if (!res.data.ok) throw new Error(res.data.error.message);
  return res.data.data;
}

export async function apiPost<T>(url: string, body?: unknown): Promise<T> {
  const res = await api.post<Envelope<T>>(url, body);
  if (!res.data.ok) throw new Error(res.data.error.message);
  return res.data.data;
}

export async function apiPatch<T>(url: string, body?: unknown): Promise<T> {
  const res = await api.patch<Envelope<T>>(url, body);
  if (!res.data.ok) throw new Error(res.data.error.message);
  return res.data.data;
}

export async function apiPut<T>(url: string, body?: unknown): Promise<T> {
  const res = await api.put<Envelope<T>>(url, body);
  if (!res.data.ok) throw new Error(res.data.error.message);
  return res.data.data;
}

export async function apiDelete<T>(url: string): Promise<T> {
  const res = await api.delete<Envelope<T>>(url);
  if (!res.data.ok) throw new Error(res.data.error.message);
  return res.data.data;
}
