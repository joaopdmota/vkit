import React from 'react'
import FieldBase from './base'
import { TagNameEnum, FieldBaseType } from '../types/fieldBase.type'

const TextField: React.FC<FieldBaseType> = (props) => {
  const tagName: TagNameEnum = props.multiline ? TagNameEnum.textarea : TagNameEnum.input

  return <FieldBase {...props} tagName={tagName} />
}

export default TextField
