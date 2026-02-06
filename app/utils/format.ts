export function formatRupiah(value: string | number): string {
  const num = typeof value === 'string' ? Number.parseFloat(value) : value
  if (Number.isNaN(num)) return 'Rp 0'

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num)
}

export function getImageUrl(
  path: string | null | undefined,
  width = 1400,
  height = 1200,
): string {
  if (path) return path
  return `https://placehold.co/${width}x${height}/1a1a2e/e0e0e0?text=No+Image`
}
