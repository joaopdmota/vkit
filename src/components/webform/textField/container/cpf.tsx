import React from 'react'
import FieldBase from './base'
import { FieldBaseType } from '../types/fieldBase.type'
import { TypeEnum, MaskEnum } from '../enums'
import { maskText } from 'shared/utils'

const CpfField: React.FC<FieldBaseType> = (props) => {
  const handleBeforeChange = (value: string): string => maskText(value, MaskEnum.cpf)

  return <FieldBase {...props} type={TypeEnum.cpf} handleBeforeChange={handleBeforeChange} />
}

export default CpfField
