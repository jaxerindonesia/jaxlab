export function formatWeight(grams: number): string {
  return grams >= 1000
    ? `${(grams / 1000).toLocaleString('id-ID', { maximumFractionDigits: 3 })} kg`
    : `${grams.toLocaleString('id-ID')} g`;
}
