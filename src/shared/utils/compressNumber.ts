function compressNumber(value: number): string {
  return (
    (typeof value === 'number' && Intl.NumberFormat('en', { notation: 'compact' }).format(value)) ||
    ''
  )
}

export default compressNumber
