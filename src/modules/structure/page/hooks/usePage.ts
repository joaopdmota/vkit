import { useRef, useState, useCallback, useEffect } from 'react'

import { DEFAULT_SIZE_Y_WINDOW } from 'shared/constants'
import getIsUserAgent from 'shared/utils/getIsUserAgent'
import routesGroup from '../types/routesGroup.type'
import MenuRouteType from '../types/menu.type'

import getRoutesMenu from '../actions/getRoutesMenu'

const UsePage = (
  routesGroups: routesGroup[],
): {
  isMobile: boolean | undefined
  useIsHovered: boolean
  useIsMenuExpand: boolean
  useIsMenuSlider: boolean
  useIsMenuSliderExpand: boolean
  useHeightContent: number
  useMaxHeightMenu: number
  useRefSliderIntance: { current: { close: () => void; open: () => void } }
  useRoutesMenu: MenuRouteType[] | null
  onButtonTrigger: () => void
  getRefSidebarWrapper: ({}: HTMLDivElement) => void
  onMouseTrigger: ({}: boolean) => void
  onSliding: ({}: any) => void
} => {
  const isMobile = getIsUserAgent('mobile')
  const useRefTimeoutMouseTrigger = useRef(0)
  const useRefSliderIntance = useRef({ close: () => {}, open: () => {} })
  const [useIsHovered, setIsHovered] = useState(false)
  const [useIsMenuExpand, setIsMenuExpand] = useState(!!isMobile)
  const [useIsMenuSlider, setIsMenuSlider] = useState(false)
  const [useIsMenuSliderExpand, setIsMenuSliderExpand] = useState(false)
  const [useMaxHeightMenu, setMaxHeightMenu] = useState(0)
  const [useHeightContent, setHeightContent] = useState(DEFAULT_SIZE_Y_WINDOW)
  const [useRoutesMenu, setRoutesMenu] = useState<MenuRouteType[] | null>([])

  window.onresize = () => setHeightContent(window.innerHeight)

  const getRefSidebarWrapper = (ref: HTMLDivElement | null): void => {
    if (ref) {
      const { childNodes } = ref
      const betweenSpaces = 16
      let heightElements = 0

      childNodes.forEach((element, key) => {
        const { offsetHeight } = element as HTMLElement
        if (key !== 2) {
          heightElements += offsetHeight
        }
      })
      setMaxHeightMenu(useHeightContent - (heightElements + betweenSpaces))
    }
  }

  const setMenuAtMouseTrigger = (isExpand: boolean): void => {
    if (!useIsMenuExpand) {
      if (useIsHovered) {
        setIsMenuExpand(isExpand)
      }
      setIsHovered(isExpand)
    } else if (useIsHovered) {
      setIsHovered(isExpand)
      setIsMenuExpand(isExpand)
    }
  }

  const onButtonTrigger = (): void => {
    setIsHovered(false)
    setIsMenuExpand(!useIsMenuExpand)
  }

  const onMouseTrigger = (isExpand: boolean): void => {
    if (!isExpand) {
      clearTimeout(useRefTimeoutMouseTrigger.current)
      setMenuAtMouseTrigger(false)
    }
    useRefTimeoutMouseTrigger.current = window.setTimeout(() => {
      setMenuAtMouseTrigger(isExpand)
    }, 300)
  }

  const onSliding = useCallback(({ slided }: { slided: number }): void => {
    if (slided === 0) {
      setIsMenuSlider(true)
      setTimeout(() => {
        setIsMenuSliderExpand(true)
      })
    } else {
      setIsMenuSliderExpand(false)
      setTimeout(() => {
        setIsMenuSlider(false)
      }, 200)
    }
  }, [])

  useEffect(() => {
    const routesMenu = routesGroups?.length ? getRoutesMenu(routesGroups) : null
    setRoutesMenu(routesMenu)
  }, [routesGroups])

  return {
    isMobile,
    useIsHovered,
    useIsMenuExpand,
    useIsMenuSlider,
    useIsMenuSliderExpand,
    useHeightContent,
    useMaxHeightMenu,
    useRefSliderIntance,
    useRoutesMenu,
    getRefSidebarWrapper,
    onButtonTrigger,
    onMouseTrigger,
    onSliding,
  }
}

export default UsePage
