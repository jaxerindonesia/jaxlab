// Keep catalogue navigation fast without persisting prices or stock across sessions.
const TTL_MS = 30_000;
type Entry = { value?: unknown; expiresAt: number; pending?: Promise<unknown> };
const entries = new Map<string, Entry>();

export function clearProductCache(): void {
  entries.clear();
}

export function cachedProducts<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const existing = entries.get(key);
  if (existing?.pending) return existing.pending as Promise<T>;
  if (existing && existing.expiresAt > Date.now()) return Promise.resolve(existing.value as T);

  const entry: Entry = { expiresAt: 0 };
  const pending = Promise.resolve().then(fetcher).then((value) => {
    // An edit may invalidate the cache while this request is still running.
    if (entries.get(key) === entry) {
      entry.value = value;
      entry.expiresAt = Date.now() + TTL_MS;
      entry.pending = undefined;
    }
    return value;
  }, (error: unknown) => {
    if (entries.get(key) === entry) entries.delete(key);
    throw error;
  });
  entry.pending = pending;
  entries.set(key, entry);
  return pending;
}
