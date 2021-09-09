import EventFieldType from './eventField.type'
import { StatusEnum } from '../enums'

type Field = EventFieldType & {
  clearable?: boolean
  disabled?: boolean
  icon?: string
  iconDir?: 'left' | 'right'
  label?: string
  placeholder?: string
  readOnly?: boolean
  required?: boolean
  status?: StatusEnum
  textHelper?: string
  textHelperTop?: boolean
  value?: number | string | { min: number; max: number } | null
}

export default Field
