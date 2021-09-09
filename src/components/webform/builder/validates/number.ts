import messagesError from './messages/errors'
import ValidateType from './types/validate.type'

export default (value: string): ValidateType => {
  const regexValidate = /^[+-]?\d+(([,\.]?){1})+\d*$/
  const result: ValidateType = {
    valid: regexValidate.test(value),
  }
  if (!result.valid) result.message = messagesError.number
  return result
}
