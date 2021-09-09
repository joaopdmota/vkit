import messagesError from './messages/errors'
import ValidateType from './types/validate.type'

const validateDate = (value: string): boolean => {
  const dateFound: RegExpExecArray | null = /(\d{2})\/(\d{2})\/(\d{4})/.exec(value)
  if (!dateFound) return false

  const day: number = +dateFound[1]
  const month: number = +dateFound[2]
  const year: number = +dateFound[3]

  if (month == 0 || month > 12) return false
  const monthLength: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) monthLength[1] = 29
  return day > 0 && day <= monthLength[month - 1]
}

export default (value: string): ValidateType => {
  const result: ValidateType = {
    valid: validateDate(value),
  }
  if (!result.valid) result.message = messagesError.date
  return result
}
