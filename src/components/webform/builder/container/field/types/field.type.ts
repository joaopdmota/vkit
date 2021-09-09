import { FieldClassesType, FieldType } from '../../../types'

import { ReactNode } from 'react'

export enum TagNameEnum {
  input = 'input',
  textarea = 'textarea',
}

export enum InputEnum {
  text = 'text',
  password = 'password',
}

export type wrapField = {
  className?: string
  children: ReactNode
  label?: string
  required?: boolean
  textHelper?: string
  style?: any
}

export type BaseFieldType = FieldType &
  FieldClassesType & {
    inputType?: InputEnum
    tagName?: TagNameEnum
    style?: { [key: string]: string }
    setValueState?: Function
    contentRight?: ReactNode
    iconDir?: 'left' | 'right'
    onClear?: Function
  }

export default BaseFieldType
