import { FieldClassesType, EventFieldType } from '../../builder/types'
import { StatusEnum } from '../../builder/enums'
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
    loading?: boolean
    multiple?: boolean
    placeholder?: string
    requestHeaders?: { [key: string]: string }
    requestPageParam?: string
    requestParams?: { [key: string]: string }
    requestResponseRootPath?: string
    requestResponseText?: string | ((item: any) => string)
    requestResponseValue?: string
    requestRouter?: string
    requestSearchParam?: string
    requestUri?: string
    required?: boolean
    requiredSign?: boolean
    showTabSelecteds?: boolean
    status?: StatusEnum
    textHelper?: string
    textHelperTop?: boolean
    value: string | string[]
    onRequestFinish?: Function
  }
export default SelectType
