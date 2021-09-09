import { EventFieldType, SizeClassesType } from '../../builder/types'

import { StatusEnum } from '../../builder/enums'

type RangeField = EventFieldType &
  SizeClassesType & {
    disabled?: boolean
    double?: boolean
    label?: string
    max?: number
    min?: number
    required?: boolean
    status?: StatusEnum
    step?: number
    textHelper?: string
    textHelperTop?: boolean
    value?: number | string | { min: number; max: number } | null
  }

export default RangeField
