import messagesError from './messages/errors'
import ValidateType from './types/validate.type'

const invalidSequences: Array<string> = [
  '00000000000000',
  '11111111111111',
  '22222222222222',
  '33333333333333',
  '44444444444444',
  '55555555555555',
  '66666666666666',
  '77777777777777',
  '88888888888888',
  '99999999999999',
]

const calculateCnpj = (cnpj: string, size: number): number => {
  const numbers: string = cnpj.substring(0, size)
  let sum = 0
  let pos: number = size - 7

  for (let i: number = size; i >= 1; i--) {
    sum += +numbers.charAt(size - i) * pos--
    if (pos < 2) pos = 9
  }

  return sum % 11 < 2 ? 0 : 11 - (sum % 11)
}

const validateCnpj = (cnpj: string): boolean => {
  if (!cnpj || cnpj.length !== 14 || invalidSequences.includes(cnpj)) return false

  const size: number = cnpj.length - 2
  const digits: string = cnpj.substring(size)

  let result = calculateCnpj(cnpj, size)
  if (result !== +digits.charAt(0)) return false

  result = calculateCnpj(cnpj, size + 1)
  return result === +digits.charAt(1)
}

export default (value = ''): ValidateType => {
  const cnpjNumbers: string = value.replace(/\D/g, '')
  const result: ValidateType = {
    valid: validateCnpj(cnpjNumbers),
  }
  if (!result.valid) result.message = messagesError.cnpj
  return result
}
