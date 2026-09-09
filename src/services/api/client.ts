import { forgetMember } from '../auth';

export async function api<T>(path: string, init?: RequestInit, timeoutMs = 20000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(path, { ...init, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      if (res.status === 401 && !/\/(login|register)$/.test(path) && !path.startsWith('/api/admin')) forgetMember();
      let message = '';
      try { message = JSON.parse(text).error ?? ''; } catch { /* Non-JSON response. */ }
      throw new Error(message || `Permintaan gagal (${res.status}). Silakan coba lagi.`);
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('Permintaan terlalu lama. Silakan coba lagi.');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
