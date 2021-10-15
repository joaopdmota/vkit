import React from 'react'

import classesBuilder from 'shared/utils/classesBuilder'

import Icon from 'shared/components/icon'

import { TabsType, TabType } from './types/tabs.type'

import UseTabs from './hooks/useTabs'

import ToggleContent from './components/toggleContent'

import style from 'theme/components/tabs/tabs.module.scss'

const Tabs: React.FC<TabsType> = ({
  onChange,
  actions = [],
  solo,
  rounded,
  outlined,
  full,
  center,
  iconDir = 'right',
  elements,
}) => {
  const { changeTab, useTabs, useTabsStyle, tabsRef } = UseTabs(onChange, actions, !!solo)

  const defaultClassName = {
    default: !solo && !rounded && !outlined,
  }

  const menuTabClassNames = {
    tabMenu: true,
    rounded,
    solo,
    outlined,
    ...defaultClassName,
  }

  const animationsClassNames = {
    animation: true,
    transition: useTabs.length,
    outlined,
    rounded,
    ...defaultClassName,
  }

  return (
    <div
      className={classesBuilder(style, {
        wrapper: true,
        full,
        center,
      })}
    >
      <div className={classesBuilder(style, menuTabClassNames)}>
        <div className={style.tabsWrapper}>
          {useTabs.map((tab: TabType, index) => (
            <button
              {...(!tab?.disabled && {
                onClick: (event) => changeTab(event, index),
              })}
              ref={(element: HTMLButtonElement) => tabsRef.current?.push(element)}
              key={index}
              className={classesBuilder(style, {
                focus: tab.active,
                [iconDir]: tab?.icon,
                disabled: tab?.disabled,
              })}
            >
              {tab?.label}
              {tab?.icon && <Icon name={tab.icon} size={16} />}
            </button>
          ))}

          <div
            className={classesBuilder(style, animationsClassNames)}
            style={{ ...useTabsStyle }}
          />
        </div>
      </div>

      <div className={style.tabView}>
        {useTabs.map((tab: TabType, index: number) => (
          <ToggleContent key={index} visible={tab?.active || false}>
            {elements[index]}
          </ToggleContent>
        ))}
      </div>
    </div>
  )
}

export default Tabs
