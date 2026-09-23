// Keep catalogue navigation fast without persisting prices or stock across sessions.
const TTL_MS = 10 * 60 * 1000;
type Entry = { value?: unknown; expiresAt: number; pending?: Promise<unknown> };
const entries = new Map<string, Entry>();
const storagePrefix = 'jaxlab_product_cache:';

function readStored(key: string): Entry | null {
  if (typeof sessionStorage === 'undefined') return null;
  try {
    const parsed = JSON.parse(sessionStorage.getItem(`${storagePrefix}${key}`) || 'null') as Entry | null;
    if (!parsed || parsed.expiresAt <= Date.now()) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStored(key: string, value: unknown, expiresAt: number): void {
  if (typeof sessionStorage === 'undefined') return;
  try {
    sessionStorage.setItem(`${storagePrefix}${key}`, JSON.stringify({ value, expiresAt }));
  } catch {
    // Storage can fail in private browsing or quota-limited contexts.
  }
}

export function clearProductCache(): void {
  entries.clear();
  if (typeof sessionStorage === 'undefined') return;
  try {
    Object.keys(sessionStorage)
      .filter((key) => key.startsWith(storagePrefix))
      .forEach((key) => sessionStorage.removeItem(key));
  } catch {
    // Ignore storage cleanup failures; API mutations already invalidated memory cache.
  }
}

export function cachedProducts<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
  const existing = entries.get(key);
  if (existing?.pending) return existing.pending as Promise<T>;
  if (existing && existing.expiresAt > Date.now()) return Promise.resolve(existing.value as T);
  const stored = readStored(key);
  if (stored) {
    entries.set(key, stored);
    return Promise.resolve(stored.value as T);
  }

  const entry: Entry = { expiresAt: 0 };
  const pending = Promise.resolve().then(fetcher).then((value) => {
    // An edit may invalidate the cache while this request is still running.
    if (entries.get(key) === entry) {
      entry.value = value;
      entry.expiresAt = Date.now() + TTL_MS;
      entry.pending = undefined;
      writeStored(key, value, entry.expiresAt);
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
