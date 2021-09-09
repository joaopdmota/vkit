import { ReactNode } from 'react'

export type SliderType = {
  arrows?: boolean
  arrowSize?: 'minor' | 'small' | 'medium' | 'larger' | 'xLarger'
  axisX?: 'left' | 'right' | boolean
  axisY?: 'top' | 'bottom' | boolean
  children?: ReactNode
  duration?: number
  elevation?: number
  indicators?: 'top' | 'right' | 'bottom' | 'left'
  infinite?: boolean
  instanceEmitter?: object
  overlay?: 'dark' | 'light' | boolean
  slider?: number
  sliding?: boolean
  onSliding?: Function
}

export type SliderElementType = {
  contentElement: HTMLDivElement | null
}

export type KeyEventsType = {
  onKeyEvents: {
    add: Function
    del: Function
  }
}

export type EventsType = {
  onMouseEnter: ({}: Event) => void
  onMouseOut: ({}: Event) => void
  onKeyDown: ({}: Event) => void
  onKeyUp: ({}: Event) => void
}
