import { useRef, useEffect } from 'react'

const useTabs = (
  tabActive: number = 0,
): {
  getLavalamp: (item: HTMLDivElement) => void
  getTabs: (item: HTMLDivElement) => void
  canAnimate: boolean
} => {
  const tabsRef = useRef<HTMLDivElement>()
  const tabRef = useRef<HTMLButtonElement>()
  const lavalampRef = useRef<HTMLDivElement>()
  const canAnimateRef = useRef<boolean>(false)

  const getTabs = (tabs: HTMLDivElement): void => {
    if (!tabsRef.current) {
      tabsRef.current = tabs
    }
  }

  const getLavalamp = (lavalamp: HTMLDivElement): void => {
    if (!lavalampRef.current) {
      lavalampRef.current = lavalamp
    }
  }

  const setPositionLavalamp = (
    tab: HTMLButtonElement,
    tabs: HTMLDivElement,
    lavalamp: HTMLDivElement,
  ): void => {
    const { left: parentLeft } = tabs.getBoundingClientRect()
    const { width, left } = tab.getBoundingClientRect()

    lavalamp.style.width = `${width}px`
    lavalamp.style.left = `${left - parentLeft}px`
  }

  useEffect(() => {
    const { childNodes } = tabsRef.current || {}

    if (childNodes?.[tabActive] && lavalampRef.current && tabsRef.current) {
      tabRef.current = childNodes?.[tabActive] as HTMLButtonElement

      setPositionLavalamp(tabRef.current, tabsRef.current, lavalampRef.current)

      canAnimateRef.current = true
    }
  }, [tabActive])

  return {
    getLavalamp,
    getTabs,
    canAnimate: canAnimateRef.current,
  }
}

export default useTabs
