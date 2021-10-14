import { useState, useLayoutEffect, useCallback, useRef } from 'react'

import { TabType } from '../types/tabs.type'

const UseTabs = (
  onChange: Function | undefined,
  actions: TabType[],
  solo: boolean,
): {
  changeTab: Function
  useTabs: TabType[]
  useTabsStyle: {} | { width: number; left: number }
  tabsRef: {
    current: HTMLButtonElement[]
  }
} => {
  const tabsRef = useRef([])
  const [useTabsStyle, setTabsStyle] = useState({})
  const [useTabs, setTabs] = useState<TabType[]>([])

  const setActiveTabPosition = useCallback((activeIndex: number): void => {
    setTimeout(() => {
      const { offsetLeft, offsetWidth } = tabsRef.current[activeIndex]

      setTabsStyle({
        left: offsetLeft,
        width: offsetWidth,
      })
    }, 300)
  }, [])

  useLayoutEffect(() => {
    const currentActiveIndex = actions.findIndex((t: TabType) => t.active)

    const parsedCurrentActiveIndex = currentActiveIndex >= 0 ? currentActiveIndex : 0

    const tabs = actions.map(({ disabled = false, icon, label }: TabType, index) => ({
      active: parsedCurrentActiveIndex === index,
      disabled,
      icon,
      label,
    }))

    const stringifiedActions = JSON.stringify(tabs)
    const stringifiedUseTabs = JSON.stringify(useTabs)

    const hasDiff = stringifiedActions !== stringifiedUseTabs

    if (hasDiff) {
      setTabs(tabs)
      setActiveTabPosition(parsedCurrentActiveIndex)
    }
  }, [actions, useTabs, setActiveTabPosition])

  const changeTab = (event: Event, newIndex: number): void => {
    const target = event.target as HTMLButtonElement

    const tabs = useTabs.map((tab: TabType, index) => ({
      ...tab,
      active: index === newIndex,
    }))

    setTabs(tabs)
    onChange?.(newIndex)

    if (!solo) {
      setTabsStyle({
        left: target.offsetLeft,
        width: target.offsetWidth,
      })
    }
  }

  return {
    changeTab,
    useTabs,
    useTabsStyle,
    tabsRef,
  }
}

export default UseTabs
