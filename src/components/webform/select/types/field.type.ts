import { ReactNode } from 'react'

import { FieldClassesType, EventFieldType } from 'components/webform/builder/types'
import { StatusEnum } from 'components/webform/builder/enums'

type FieldSingleType = FieldClassesType &
  EventFieldType & {
    clearable?: boolean
    contentRight?: ReactNode
    disabled?: boolean
    icon?: string
    placeholder?: string
    required?: boolean
    setStatus: Function
    setTextHelper: Function
    status?: StatusEnum
    statusOrigin?: StatusEnum
    textHelper?: string
    value?: string | string[]
  }

export default FieldSingleType
