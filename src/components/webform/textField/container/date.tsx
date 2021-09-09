import React from 'react'
import FieldBase from './base'
import { FieldBaseType } from '../types/fieldBase.type'
import { TypeEnum, MaskEnum } from '../enums'
import { maskText } from 'shared/utils'

const DateField: React.FC<FieldBaseType> = (props) => {
  const handleBeforeChange = (value: string): string => maskText(value, MaskEnum.date)

  return <FieldBase {...props} type={TypeEnum.date} handleBeforeChange={handleBeforeChange} />
}

export default DateField
