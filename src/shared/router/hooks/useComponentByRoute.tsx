import React, { useEffect, useState } from 'react'

import { Route } from 'react-router-dom'
import { RouteType, RoutesGroupType } from '../types/router.type'
import WrapComponentRoute from '../container/wrapComponentRoute/wrapComponentRoute'

type ComponentsByRouteType = { [key: string]: typeof Route[] }

const useComponentsByRoute = (routes: RoutesGroupType[]): ComponentsByRouteType => {
  const [componentsByRoute, setComponentsByRoute] = useState<ComponentsByRouteType>({})

  const treatPath = (path: string): string => path.replace(/\/?(.*)/, '/$1')

  const getTypeComponent = (routeItem: RouteType): 'page' | 'modal' =>
    /modal/i.test(routeItem?.type || 'page') ? 'modal' : 'page'

  const getTypePage = (
    hasParent: boolean,
    isModal: boolean,
  ): 'setPage' | 'pushPage' | 'modalPage' => {
    if (isModal) {
      return 'modalPage'
    } else if (hasParent) {
      return 'pushPage'
    }

    return 'setPage'
  }

  useEffect(() => {
    const getRoutePages = (
      routesList: RouteType[],
      routeParentPath: string = '',
    ): ComponentsByRouteType => {
      const components: ComponentsByRouteType = {
        modalPage: [],
        setPage: [],
        pushPage: [],
      }

      for (const routeItem of routesList) {
        const currentPath = treatPath(routeItem.path)
        const path = `${routeParentPath}${currentPath}`
        const ComponentRoute = routeItem.component as React.FC

        const typeComponent = getTypeComponent(routeItem)
        const componentKey = getTypePage(!!routeParentPath, typeComponent === 'modal')

        components[componentKey].push(
          (
            <Route exact={routeItem.exact} key={path} path={path}>
              {({ match }) => (
                <WrapComponentRoute
                  show={match !== null}
                  title={routeItem?.title}
                  type={typeComponent}
                  pathParent={routeParentPath}
                >
                  <ComponentRoute />
                </WrapComponentRoute>
              )}
            </Route>
          ) as unknown as typeof Route,
        )

        if (Array.isArray(routeItem?.children) && routeItem?.children.length > 0) {
          const routeComponentsChildren = getRoutePages(routeItem?.children, path)
          components.setPage.push(...routeComponentsChildren.setPage)
          components.pushPage.push(...routeComponentsChildren.pushPage)
          components.modalPage.push(...routeComponentsChildren.modalPage)
        }
      }

      return components
    }

    const mountRoutePages = (routesGroups: RoutesGroupType[]): ComponentsByRouteType => {
      const components: ComponentsByRouteType = {
        modalPage: [],
        setPage: [],
        pushPage: [],
      }

      for (const { routes } of routesGroups) {
        const routesComponents = getRoutePages(routes)
        components.setPage.push(...routesComponents.setPage)
        components.pushPage.push(...routesComponents.pushPage)
        components.modalPage.push(...routesComponents.modalPage)
      }

      return components
    }

    setComponentsByRoute(mountRoutePages(routes))
  }, [routes])

  return componentsByRoute
}

export default useComponentsByRoute
