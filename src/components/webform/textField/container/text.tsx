import React from 'react'
import FieldBase from './base'
import { TagNameEnum, FieldBaseType } from '../types/fieldBase.type'
import { maskText } from 'shared/utils'

const TextField: React.FC<FieldBaseType> = (props) => {
  const tagName: TagNameEnum = props.multiline ? TagNameEnum.textarea : TagNameEnum.input

  return (
    <FieldBase
      {...props}
      {...(props.mask && {
        handleBeforeChange: (value: string): string => maskText(value, props.mask || ''),
      })}
      tagName={tagName}
    />
  )
}

export default TextField
