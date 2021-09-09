import { ReactNode } from 'react'
import FloatLayerClassesType from './floatLayerClasses.type'

type FloatLayerType = FloatLayerClassesType & {
  body?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  header?: ReactNode
  height?: number
  onClose?: () => void
  title?: string
  closeClickOutside?: boolean
  maxWidth?: string
}

export default FloatLayerType
