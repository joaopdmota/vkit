import React from 'react'

export type WrapComponentRouteChildrenType = {
  children: React.ReactNode
  height?: number
  show?: boolean
  pathParent?: string
}

export type WrapComponentRouteModalType = WrapComponentRouteChildrenType & {
  persistent?: boolean
  title?: string
  width?: number
}

export type WrapComponentRouteType = {
  children: React.ReactNode
  pathParent?: string
  show?: boolean
  title?: string
  type: 'modal' | 'page'
}

export default WrapComponentRouteType
