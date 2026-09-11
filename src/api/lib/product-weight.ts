// Berat pengiriman dapat diisi melalui spesifikasi produk di admin.
export function getProductWeight(specs: unknown) {
  if (Array.isArray(specs)) {
    for (const label of ['berat pengiriman', 'berat barang', 'berat']) {
      const spec = specs.find((entry) => String(entry?.label).trim().toLowerCase() === label);
      const match = String(spec?.value ?? '').trim().toLowerCase().match(/^(\d+(?:\.\d{3})*(?:,\d+)?|\d+\.\d+)\s*(kg|g|gr|gram)$/);
      if (match) {
        const amount = /^\d{1,3}(\.\d{3})+(,\d+)?$/.test(match[1]) ? match[1].replaceAll('.', '') : match[1];
        const grams = Number(amount.replace(',', '.')) * (match[2] === 'kg' ? 1000 : 1);
        if (Number.isFinite(grams) && grams > 0) return { weightGrams: Math.ceil(grams), weightEstimated: false };
      }
    }
  }
  const fallback = Number(process.env.RAJAONGKIR_DEFAULT_WEIGHT_GRAMS ?? 1000);
  return { weightGrams: Number.isFinite(fallback) && fallback > 0 ? Math.ceil(fallback) : 1000, weightEstimated: true };
}
