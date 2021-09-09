import React from 'react'
import FieldBase from './base'
import { FieldBaseType } from '../types/fieldBase.type'
import { TypeEnum, MaskEnum } from '../enums'
import { maskText } from 'shared/utils'

const CnpjField: React.FC<FieldBaseType> = (props) => {
  const handleBeforeChange = (value: string): string => maskText(value, MaskEnum.cnpj)

  return <FieldBase {...props} type={TypeEnum.cnpj} handleBeforeChange={handleBeforeChange} />
}

export default CnpjField
