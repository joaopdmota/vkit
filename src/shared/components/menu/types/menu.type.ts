export type MenuItemType = {
  active: boolean
  icon?: string
  name: string
  path: string
  submenu?: MenuItemType[]
}

export type MenuRouteType = {
  name: string
  submenu: MenuItemType[]
}

export type MenuType = {
  callback?: Function
  expand?: boolean
  maxHeight?: number
  routes: MenuRouteType[]
}
