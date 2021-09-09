import { useRef, useCallback, useEffect } from 'react'

import { ContentElementCustomEventsType } from '../types/content.type'

import { addEvents, removeEvents } from '../builders/setEvents'
interface UseScrollbarInterface {
  current: HTMLDivElement | null
}
interface UseRefScrollContentInterface extends ContentElementCustomEventsType, HTMLDivElement {}

const UseScrollbar = (onScroll?: Function): UseScrollbarInterface => {
  const useRefScrollContent = useRef<UseRefScrollContentInterface | null>(null)

  const getOnScrollContent = useCallback(() => {
    const { current: contentElement } = useRefScrollContent

    if (contentElement) {
      removeEvents({ contentElement })
      addEvents({ contentElement }, onScroll)
    }
  }, [onScroll])

  const removeOnScrollContent = useCallback(() => {
    const { current: contentElement } = useRefScrollContent

    if (contentElement) {
      removeEvents({ contentElement })
    }
  }, [])

  useEffect(() => {
    if (onScroll) {
      getOnScrollContent()
    }
    return () => {
      if (onScroll) {
        removeOnScrollContent()
      }
    }
  }, [getOnScrollContent, onScroll, removeOnScrollContent])

  return useRefScrollContent
}

export default UseScrollbar
