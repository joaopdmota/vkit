import { useState, useCallback, useEffect } from 'react'

import { useHistoryNavigation } from 'shared/router'

import { MenuRouteType, MenuItemType } from '../types/menu.type'
interface SetPositionsInterface {
  currentRoutes: Array<any>
  handleRouteChange: Function
}

const SetPositions = (menuRoutes: MenuRouteType[]): SetPositionsInterface => {
  const navigation = useHistoryNavigation()

  const [currentRoutes, setRoutes] = useState<Array<any>>([])

  const handleRouteChange = (currentRoute: MenuItemType): void => {
    const { path } = currentRoute

    const routes = updateRoutes(path)

    setRoutes(routes)

    navigation.push(path)
  }

  const updateRoutes = useCallback(
    (currentRoute: string): Array<MenuItemType> => {
      const routesData = currentRoutes.length ? currentRoutes : menuRoutes

      const router = routesData.map((route: MenuItemType) => {
        if (route.submenu?.length) {
          route.submenu.map((submenu: MenuItemType) => {
            submenu.active = currentRoute === submenu.path
            return submenu
          })
        } else {
          route.active = currentRoute === route.path
        }
        return route
      })

      return router
    },
    [currentRoutes, menuRoutes],
  )

  useEffect(() => {
    if (!currentRoutes.length && menuRoutes.length) {
      const currentRoute = window.location.pathname
      const routes = updateRoutes(currentRoute)
      setRoutes(routes)
    }
  }, [currentRoutes.length, updateRoutes, menuRoutes.length])

  return {
    currentRoutes,
    handleRouteChange,
  }
}

export default SetPositions
