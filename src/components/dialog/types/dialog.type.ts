import { ReactElement, ReactNode } from 'react'

type DialogType = {
  autoOpen?: boolean
  body?: ReactElement | string
  children?: ReactNode
  close?: boolean
  elevation?: number
  footer?: ReactElement | string
  head?: ReactElement | string
  instanceEmitter?: {
    open: () => void
    dismiss: () => void
  }
  persistent?: boolean
  outlined?: boolean
  rounded?: boolean
  shadow?: boolean
  size?: 'minor' | 'small' | 'medium' | 'larger' | 'xLarger'
  title?: ReactElement | string
  onClose?: Function
}

export default DialogType
