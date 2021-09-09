import { StatusEnum } from '../../enums'

type CreateValidationType = {
  setHelperState: Function
  setStatusState: Function
  setValidatedState: Function
  status?: StatusEnum
  textHelper?: string
  type?: string
  required?: boolean
}

export default CreateValidationType
