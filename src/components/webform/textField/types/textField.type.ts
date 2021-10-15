import { FieldType } from '../../builder/types'
import RangeFieldType from './rangeField.type'
import TextFieldClassesType from './textFieldClasses.type'

type TextFieldType = TextFieldClassesType &
  FieldType &
  RangeFieldType & {
    type?: 'cep' | 'cnpj' | 'cpf' | 'date' | 'number' | 'password' | 'range' | 'text'
    disabled?: boolean
    mask?: string
    loading?: boolean
  }

export default TextFieldType
