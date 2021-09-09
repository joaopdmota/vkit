import { useState, useEffect, useCallback, useRef } from 'react'

import { TabType } from '../types/tabs.type'

const UseTabs = (
  active = 0,
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
    const { offsetLeft, offsetWidth } = tabsRef.current[activeIndex]

    setTabsStyle({
      left: offsetLeft,
      width: offsetWidth,
    })
  }, [])

  useEffect(() => {
    if (!Object.keys(useTabsStyle).length) {
      const defaultIndex = actions.length > active ? active : 0

      const tabs = actions.map((element: TabType, index: number) => ({
        ...element,
        active: defaultIndex === index,
      }))

      window.addEventListener('load', setActiveTabPosition.bind(null, defaultIndex))

      setTabs(tabs)

      return () => {
        window.removeEventListener('load', setActiveTabPosition.bind(null, defaultIndex))
      }
    }
  }, [actions, solo, active, useTabsStyle, setActiveTabPosition])

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
