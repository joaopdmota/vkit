export default function convertToNumber(val: string, hasConvertPositive?: boolean): number {
  const numberFixed = Number(val.replace('px', '')).toFixed(10)
  const numberInt = parseInt(numberFixed, 10)
  const numberCalled = hasConvertPositive ? numberInt * -1 : numberInt

  return numberCalled || 0
}
