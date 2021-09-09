import TextAreaType from './textArea.type'
import { StatusEnum } from '../../builder/enums'

export enum TagNameEnum {
  input = 'input',
  textarea = 'textarea',
}

export type FieldBaseType = TextAreaType & {
  handleBeforeChange?: Function
  setTtfStatus: Function
  setTtfTextHelper: Function
  setTtfValue: Function
  statusOrigin?: StatusEnum
}

export default FieldBaseType
