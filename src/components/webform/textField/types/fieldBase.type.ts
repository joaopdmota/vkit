import TextFieldType from '../types/textField.type'
import { StatusEnum } from '../../builder/enums'
import { ReactNode } from 'react'

export enum TagNameEnum {
  input = 'input',
  textarea = 'textarea',
}

export enum InputEnum {
  text = 'text',
  password = 'password',
}

export type FieldBaseType = TextFieldType & {
  handleBeforeChange?: Function
  inputType?: InputEnum
  tagName?: TagNameEnum
  setTtfStatus: Function
  setTtfTextHelper: Function
  setTtfValue: Function
  statusOrigin?: StatusEnum
  contentRight?: ReactNode
}

export default FieldBaseType
