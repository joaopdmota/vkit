import { ReactNode } from 'react'

type ScrollbarType = {
  children: ReactNode
  maxHeight?: number
  scrollHeight?: number
  onlyWheel?: boolean
  onScroll?: Function
  stopPropagation?: boolean
}

export default ScrollbarType
