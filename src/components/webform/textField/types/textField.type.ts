import { FieldType } from '../../builder/types'
import RangeFieldType from './rangeField.type'
import TextFieldClassesType from './textFieldClasses.type'

type TextFieldType = TextFieldClassesType &
  FieldType &
  RangeFieldType & {
    type?: string
    disabled?: boolean
    mask?: string
  }

export default TextFieldType
