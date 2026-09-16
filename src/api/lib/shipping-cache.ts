// Short-lived quotes only; order creation still requests a fresh tariff.
export function createShippingCache<T>(ttlMs = 15_000, maxEntries = 200) {
  const entries = new Map<string, { expires: number; pending: Promise<T> }>();
  return (key: string, fetcher: () => Promise<T>): Promise<T> => {
    const cached = entries.get(key);
    if (cached && cached.expires > Date.now()) return cached.pending;
    entries.delete(key);
    if (entries.size >= maxEntries) entries.delete(entries.keys().next().value!);
    const entry = { expires: Infinity, pending: Promise.resolve().then(fetcher) };
    entry.pending = entry.pending.then(value => {
      entry.expires = Date.now() + ttlMs;
      return value;
    }, error => {
      if (entries.get(key) === entry) entries.delete(key);
      throw error;
    });
    entries.set(key, entry);
    return entry.pending;
  };
}
