import { RoutesGroupType, RouteType } from '../types/routesGroup.type'
import { MenuType, MenuItemType } from '../types/menu.type'

const treatPath = (path: string): string => path.replace(/\/?(.*)/, '/$1')

const getSubmenu = (routes: RouteType[], routeParentPath?: string): MenuItemType[] => {
  if (!routes) {
    return []
  }

  const routesMenu = []

  for (const route of routes) {
    if (route?.nameMenu) {
      const currentPath = treatPath(route.path)
      const path = `${routeParentPath || ''}${currentPath}`

      routesMenu.push({
        active: !!route.active,
        icon: route.icon,
        name: route.nameMenu,
        path,
      })
    }
  }

  return routesMenu
}

const getRoutesMenu = (routesGroups: RoutesGroupType[]): MenuType[] => {
  if (!routesGroups) {
    return []
  }

  const routesMenu = []

  for (const { routes, title } of routesGroups) {
    if (Array.isArray(routes) && routes.length > 0) {
      const submenu = getSubmenu(routes)

      routesMenu.push({
        name: title,
        submenu,
      })
    }
  }

  return routesMenu
}

export default getRoutesMenu
