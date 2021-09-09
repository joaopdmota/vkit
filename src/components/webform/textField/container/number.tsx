import React from 'react'
import FieldBase from './base'
import { FieldBaseType } from '../types/fieldBase.type'
import { TypeEnum } from '../enums'

const NumberField: React.FC<FieldBaseType> = (props) => {
  const removeNotNumbers = (value: string): string => {
    return value.replace(/[^+-\d\.]/g, '')
  }

  const validateValue = (value: string): boolean => {
    const regexTest = /^[+-]?\d*?\d\.?\d*$/
    return regexTest.test(value)
  }

  const handleBeforeChange = (value: string): string => {
    const valid = validateValue(value)
    return valid ? value : removeNotNumbers(props.value ?? '0')
  }

  return <FieldBase {...props} type={TypeEnum.number} handleBeforeChange={handleBeforeChange} />
}

export default NumberField
