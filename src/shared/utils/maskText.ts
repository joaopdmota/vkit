export default (value: string, format: string): string => {
  if (!value || !format) {
    return value
  }
  
  let result = ''
  let indexFormatSplit = 0
  let indexValueSplit = 0
  const valueNumbers = value.replace(/\D/g, '')

  while (indexValueSplit < valueNumbers.length && indexFormatSplit < format.length) {
    const charFormat: string = format[indexFormatSplit]
    const charValue: string = valueNumbers[indexValueSplit]
    const replaceble: boolean = charFormat === '9'

    result += replaceble ? charValue : charFormat

    if (replaceble) {
      indexValueSplit += 1
    }

    indexFormatSplit += 1
  }

  return result
}
