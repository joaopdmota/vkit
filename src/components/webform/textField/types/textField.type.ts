import { FieldType } from '../../builder/types'
import RangeFieldType from './rangeField.type'
import TextFieldClassesType from './textFieldClasses.type'
import { TypeEnum } from '../enums'

type TextFieldType = TextFieldClassesType &
  FieldType &
  RangeFieldType & {
    type?: TypeEnum
    disabled?: boolean
    mask?: string
  }

export default TextFieldType
