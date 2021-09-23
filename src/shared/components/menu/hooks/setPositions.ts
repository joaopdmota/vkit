import { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useHistoryNavigation } from 'shared/router'

import { MenuRouteType, MenuItemType } from '../types/menu.type'
interface SetPositionsInterface {
  currentRoutes: Array<any>
  handleRouteChange: Function
}

const SetPositions = (menuRoutes: MenuRouteType[]): SetPositionsInterface => {
  const navigation = useHistoryNavigation()
  const location = useLocation()

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
    const activeRoute = currentRoutes
      .map((route) =>
        route.submenu?.find(
          ({ active, path }: { active: boolean; path: string }) =>
            !active && path === location.pathname,
        ),
      )
      .reduce((_, item) => item, null)

    if ((!currentRoutes.length && menuRoutes.length) || activeRoute) {
      const currentRoute = location.pathname
      const routes = updateRoutes(currentRoute)
      setRoutes(routes)
    }
  }, [currentRoutes, updateRoutes, menuRoutes.length, location])

  return {
    currentRoutes,
    handleRouteChange,
  }
}

export default SetPositions
