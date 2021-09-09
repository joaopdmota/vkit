import React from 'react'

import Icon from 'shared/components/icon'
import Scrollbar from 'shared/components/context/scrollbar/scrollbar'
import classesBuilder from 'shared/utils/classesBuilder'

import { MenuItemType, MenuType } from './types/menu.type'

import SetPositions from './hooks/setPositions'

import style from 'theme/components/menu/menu.module.scss'

const Menu: React.FC<MenuType> = ({ callback, expand, maxHeight, routes }) => {
  const { currentRoutes, handleRouteChange } = SetPositions(routes)

  return (
    <div
      className={classesBuilder(style, {
        menu: true,
        expand,
      })}
    >
      <div className={style.wrapper}>
        <Scrollbar maxHeight={maxHeight || window.innerHeight} onlyWheel>
          {currentRoutes.map((routeType: MenuItemType) => (
            <div className={style.listItems} key={routeType.name}>
              <h5 className={style.title}>{routeType.name}</h5>
              {routeType?.submenu?.map((route: MenuItemType, index: number) => (
                <div
                  className={classesBuilder(style, {
                    item: true,
                    active: route.active,
                  })}
                  key={index}
                >
                  <button
                    className={style.itemRoute}
                    onClick={() => {
                      handleRouteChange(route)
                      callback?.(route)
                    }}
                  >
                    <Icon name={route.icon || ''} />
                    <span className={style.label}>{route.name}</span>
                  </button>
                </div>
              ))}
            </div>
          ))}
        </Scrollbar>
      </div>
    </div>
  )
}

export default Menu
