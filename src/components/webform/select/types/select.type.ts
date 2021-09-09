import { FieldClassesType, EventFieldType } from 'components/webform/builder/types'
import { StatusEnum } from 'components/webform/builder/enums'
import SelectClassesType from './selectClasses.type'
import DataType from './data.type'

type SelectType = EventFieldType &
  FieldClassesType &
  SelectClassesType & {
    autoRequest?: boolean
    autocomplete?: boolean
    clearable?: boolean
    data?: DataType[] | null
    disabled?: boolean
    searchable?: boolean
    icon?: string
    label?: string
    multiple?: boolean
    placeholder?: string
    requestHeaders?: { [key: string]: string }
    requestPageParam?: string
    requestParams?: { [key: string]: string }
    requestResponseRootPath?: string
    requestResponseText?: string
    requestResponseValue?: string
    requestRouter?: string
    requestSearchParam?: string
    requestUri?: string
    required?: boolean
    showTabSelecteds?: boolean
    status?: StatusEnum
    textHelper?: string
    textHelperTop?: boolean
    value: string | string[]
  }
export default SelectType
