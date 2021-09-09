import ValidateType from './types/validate.type'
import ValidateEnum from './types/validateEnum.type'
import * as validates from './index'

export default (validateItems: Array<ValidateEnum>, value: any): ValidateType => {
  for (const validateItem of validateItems) {
    const result = validates[validateItem](value)
    if (!result.valid) return result
  }

  return {
    valid: true,
  }
}
