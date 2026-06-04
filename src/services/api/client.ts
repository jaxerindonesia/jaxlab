export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const res = await fetch(path, { ...init, signal: controller.signal });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
    }
    return (await res.json()) as T;
  } catch (err) {
    if (err instanceof Error && err.name === 'AbortError') {
      throw new Error('API timeout after 5000ms');
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}
