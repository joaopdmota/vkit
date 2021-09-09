import React from 'react'
import FieldBase from './base'
import { FieldBaseType } from '../types/fieldBase.type'
import { TypeEnum, MaskEnum } from '../enums'
import { maskText } from 'shared/utils'

const CepField: React.FC<FieldBaseType> = (props) => {
  const handleBeforeChange = (value: string): string => maskText(value, MaskEnum.cep)

  return <FieldBase {...props} type={TypeEnum.cep} handleBeforeChange={handleBeforeChange} />
}

export default CepField
