import messagesError from './messages/errors'
import ValidateType from './types/validate.type'

export default (value: string | number | Array<any> | undefined): ValidateType => {
  const result: ValidateType = {
    valid: Array.isArray(value) ? value.length > 0 : !!value || value === 0,
  }
  if (!result.valid) result.message = messagesError.required
  return result
}
