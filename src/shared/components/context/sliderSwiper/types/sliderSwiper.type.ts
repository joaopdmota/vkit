import { ReactNode } from 'react'

export type ControllerType = {
  index: number
  isStart: boolean
  isClosed: boolean
  lastPosition: { x: number; y: number }
  slided: number
  sliding: number
  startCords: { startX: number; startY: number }
  timeoutStart: number
}

export type SliderSwiperType = {
  axisX?: 'left' | 'right' | boolean
  axisY?: 'top' | 'bottom' | boolean
  children?: ReactNode
  closed?: boolean
  duration?: number
  elastic?: boolean
  indicators?: 'top' | 'right' | 'bottom' | 'left'
  infinite?: boolean
  instanceEmitter?: object
  parentMove?: boolean
  preventDefault?: boolean
  slider?: number
  sliders?: boolean
  sliding?: boolean
  startElement?: HTMLDivElement | null
  onSliding?: Function
}

export type SliderElementType = {
  contentElement: HTMLDivElement | null
}

export type TouchEventsType = {
  onTouchEvents: {
    add: Function
    close: Function
    open: Function
    del: Function
    goSlider: ({}: number) => void
  }
}

export type EventsType = {
  onClickSlider: ({}: number) => void
  onClose: () => void
  onOpen: () => void
  onTouchStart: ({}: Event) => void
  onTouchEnd: ({}: Event) => void
  onTouchMove: ({}: Event) => void
}
