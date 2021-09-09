import messagesError from './messages/errors'
import ValidateType from './types/validate.type'

const invalidSequences: Array<string> = [
  '00000000000',
  '11111111111',
  '22222222222',
  '33333333333',
  '44444444444',
  '55555555555',
  '66666666666',
  '77777777777',
  '88888888888',
  '99999999999',
]

const calculateCpf = (cpf: string, size: number): number => {
  let soma = 0
  let resto = 0

  for (let i = 1; i <= size; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (size + 2 - i)
  }

  resto = (soma * 10) % 11
  if (resto == 10 || resto == 11) resto = 0

  return resto
}

const validateCpf = (cpf: string): boolean => {
  if (!cpf || cpf.length !== 11 || invalidSequences.includes(cpf)) return false

  let resto = calculateCpf(cpf, 9)
  if (resto !== parseInt(cpf.substring(9, 10))) return false

  resto = calculateCpf(cpf, 10)
  return resto === parseInt(cpf.substring(10, 11))
}

export default (value = ''): ValidateType => {
  const cpfNumbers: string = value.replace(/\D/g, '')
  const result: ValidateType = {
    valid: validateCpf(cpfNumbers),
  }
  if (!result.valid) result.message = messagesError.cpf
  return result
}
