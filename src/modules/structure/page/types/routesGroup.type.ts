import { ReactNode } from 'react'

export type RouteType = {
  active?: boolean
  children?: RouteType[]
  component: ReactNode
  exact?: boolean
  icon?: string
  nameMenu: string
  path: string
  title?: string
  type?: 'modal' | 'page'
}

export type RoutesGroupType = {
  title: string
  routes: RouteType[]
}

export default RoutesGroupType
