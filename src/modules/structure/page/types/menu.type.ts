export type MenuItemType = {
  active: boolean
  icon?: string
  name: string
  path: string
  submenu?: MenuItemType[]
}

export type MenuType = {
  name: string
  submenu: MenuItemType[]
}

export default MenuType
