import { validate } from '../index'
import { StatusEnum } from '../../enums'
import { CreateValidationType, ValidateEnumType, ValidateType } from '../types'

const createValidation = ({
  setHelperState,
  setStatusState,
  setValidatedState,
  status,
  textHelper,
  type,
  required,
}: CreateValidationType): Function => {
  const validateValue = (validateItem: ValidateEnumType, value: string): ValidateType => {
    const validateItems: Array<ValidateEnumType> = []
    if (required) validateItems.push(ValidateEnumType.required)
    if (value && ValidateEnumType[validateItem]) validateItems.push(ValidateEnumType[validateItem])
    return validate(validateItems, value)
  }

  const showError = (message: string): void => {
    setHelperState(message)
    setStatusState(StatusEnum.error)
  }

  const hideError = (): void => {
    setHelperState(textHelper)
    setStatusState(status)
  }

  return (value: string): void => {
    hideError()
    const { message } = validateValue(type as ValidateEnumType, value)
    if (message) showError(message)
    setValidatedState(true)
  }
}

export default createValidation
