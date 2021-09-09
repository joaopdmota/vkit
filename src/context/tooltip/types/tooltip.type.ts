import { ReactNode } from 'react'

export type TooltipType = {
  children: ReactNode
  position?: 'top' | 'right' | 'bottom' | 'left'
  text: string | ReactNode
}

export type PositionsResolverType = {
  layerHeight: number
  layerWidth: number
  wrapperLeft: number
  wrapperTop: number
  wrapperHeight: number
  wrapperWidth: number
}
